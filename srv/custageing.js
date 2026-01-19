const cds = require('@sap/cds');
const axios = require('axios');
const config = require('./config');
const { date } = require('@sap/cds/lib/core/classes');

module.exports = cds.service.impl(async function () {

    // =================================================
    // Helper: Basic Auth Header
    // =================================================
    const getAuthHeader = (username, password) => ({
        Authorization:
            'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        Accept: 'application/json'
    });

    // =================================================
    // Helper: Build Range Filter
    // =================================================
    const buildRangeFilter = (field, ranges) => {
        if (!Array.isArray(ranges) || ranges.length === 0) return null;

        const clauses = ranges
            .filter(r => r.low && r.high)
            .map(r => `(${field} ge '${r.low}' and ${field} le '${r.high}')`);

        return clauses.length ? `(${clauses.join(' or ')})` : null;
    };

    // =================================================
    // Helper: Build OR filter
    // =================================================
    const buildOrFilter = (field, values) => {
        if (!Array.isArray(values) || values.length === 0) return null;
        return `(${values.map(v => `${field} eq '${v}'`).join(' or ')})`;
    };

    // =================================================
    // Helper: Date → OData datetime
    // =================================================
    const toODataDate = (dateStr) =>
        `datetime'${dateStr}T00:00:00'`;

    // =================================================
    // Helper: Fetch all pages
    // =================================================
    const fetchAllPages = async (url, headers, params) => {
        let results = [];
        let nextUrl = url;
        let nextParams = { ...params };

        while (nextUrl) {
            const res = await axios.get(nextUrl, { headers, params: nextParams });
            const data = res.data?.d;
            if (!data) break;

            results.push(...(data.results || []));

            if (data.__next) {
                nextUrl = data.__next;
                nextParams = {};
            } else {
                nextUrl = null;
            }
        }
        return results;
    };

    // =================================================
    // Helper: Chunk array
    // =================================================
    const chunkArray = (arr, size = 30) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    // =================================================
    // Helper: Fetch additional customer details
    // =================================================
    const fetchCustomerDetails = async (customerIds) => {
        if (!customerIds.length) return [];
        const chunks = chunkArray(customerIds, 30);
        const allCustomers = [];

        for (const chunk of chunks) {
            const filter = buildOrFilter('Customer', chunk);
            const custData = await fetchAllPages(
                config.Customer.url,
                getAuthHeader(config.Customer.username, config.Customer.password),
                {
                    $filter: filter,
                    $select: [
                        'Customer',
                        'CustomerAccountGroup',
                        'CustomerFullName',
                        'Industry',
                        'IndustryCode1',
                        'IndustryCode2',
                        'IndustryCode3',
                        'IndustryCode4',
                        'IndustryCode5',
                        'PostingIsBlocked'//,
                        // 'TradingPartner'
                    ].join(',')
                }
            );
            allCustomers.push(...custData);
        }

        // Remove duplicates
        return Array.from(
            new Map(allCustomers.map(c => [c.Customer, c])).values()
        );
    };

    // =================================================
    // Helper: Parse SAP OData Date (/Date(…)/)
    // =================================================
    const parseSapDate = (value) => {
        if (!value) return null;

        // Already JS Date
        if (value instanceof Date) return value;

        // SAP format: /Date(1751241600000)/
        if (typeof value === 'string') {
            const match = value.match(/\/Date\((\d+)\)\//);
            if (match) {
                return new Date(Number(match[1]));
            }
        }

        return null;
    };
    // =================================================
    // Helper: Parse SAP date safely
    // =================================================
    const toDate = (d) => {
        if (!d) return null;
        const date = new Date(d);
        return isNaN(date.getTime()) ? null : date;
    };

    // =================================================
    // Helper: Add days to date
    // =================================================
    const addDays = (date, days = 0) => {
        if (!date) return null;
        const d = new Date(date);
        d.setDate(d.getDate() + Number(days || 0));
        return d;
    };

    // =================================================
    // Helper: Difference in days (KeyDate - BaseDate)
    // =================================================
    const diffDays = (keyDate, baseDate) => {
        if (!keyDate || !baseDate) return null;
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.floor((keyDate - baseDate) / msPerDay);
    };


    const calculateAgeingDays = (row, keyDateStr, rule) => {

        const keyDate = new Date(keyDateStr);
        if (isNaN(keyDate)) return null;

        const baselineDate = parseSapDate(row.DueCalculationBaseDate);
        const postingDate = parseSapDate(row.PostingDate);
        const documentDate = parseSapDate(row.DocumentDate);
        const netDueDate = parseSapDate(row.NetDueDate);

        /*        console.log("*********");
                console.log(keyDate);
                console.log(baselineDate);
                console.log(postingDate);
                console.log(documentDate);
                console.log(netDueDate);
                console.log("*********");
        */
        const totalPayDays =
            Number(row.CashDiscount1Days || 0) +
            Number(row.CashDiscount2Days || 0) +
            Number(row.NetPaymentDays || 0);

        let baseDate = null;

        switch (rule) {
            case 'R1':
                baseDate = netDueDate ? netDueDate : addDays(baselineDate, totalPayDays);
                break;

            case 'R2':
                baseDate = addDays(postingDate, totalPayDays);
                break;

            case 'R3':
                baseDate = addDays(documentDate, totalPayDays);
                break;

            case 'R4':
                baseDate = baselineDate;
                break;

            case 'R5':
                baseDate = postingDate;
                break;

            case 'R6':
                baseDate = documentDate;
                break;

            default:
                return null;
        }

        return diffDays(keyDate, baseDate);
    };


    // =================================================
    // Helper: Assign amounts to ageing buckets
    // =================================================
    const assignBuckets = (ageInDays, amountCompany, amountTransaction, amountAdditional) => {
        const buckets = {
            // Company Code Currency
            AmountInCompanyCodeCurrency_Bucket0: 0,
            AmountInCompanyCodeCurrency_Bucket1: 0,
            AmountInCompanyCodeCurrency_Bucket2: 0,
            AmountInCompanyCodeCurrency_Bucket3: 0,
            AmountInCompanyCodeCurrency_Bucket4: 0,
            AmountInCompanyCodeCurrency_Bucket5: 0,
            AmountInCompanyCodeCurrency_Bucket6: 0,

            // Transaction Currency
            AmountInTransactionCurrency_Bucket0: 0,
            AmountInTransactionCurrency_Bucket1: 0,
            AmountInTransactionCurrency_Bucket2: 0,
            AmountInTransactionCurrency_Bucket3: 0,
            AmountInTransactionCurrency_Bucket4: 0,
            AmountInTransactionCurrency_Bucket5: 0,
            AmountInTransactionCurrency_Bucket6: 0,

            // Additional Currency 1
            AmountInAdditionalCurrency1_Bucket0: 0,
            AmountInAdditionalCurrency1_Bucket1: 0,
            AmountInAdditionalCurrency1_Bucket2: 0,
            AmountInAdditionalCurrency1_Bucket3: 0,
            AmountInAdditionalCurrency1_Bucket4: 0,
            AmountInAdditionalCurrency1_Bucket5: 0,
            AmountInAdditionalCurrency1_Bucket6: 0,
        };

        // Determine the bucket
        let bucketIndex = 0;
        if (ageInDays === null || ageInDays <= 0) bucketIndex = 0;
        else if (ageInDays <= 30) bucketIndex = 1;
        else if (ageInDays <= 60) bucketIndex = 2;
        else if (ageInDays <= 90) bucketIndex = 3;
        else if (ageInDays <= 180) bucketIndex = 4;
        else if (ageInDays <= 365) bucketIndex = 5;
        else bucketIndex = 6;

        // Assign amounts to the corresponding bucket
        buckets[`AmountInCompanyCodeCurrency_Bucket${bucketIndex}`] = Number(amountCompany || 0);
        buckets[`AmountInTransactionCurrency_Bucket${bucketIndex}`] = Number(amountTransaction || 0);
        buckets[`AmountInAdditionalCurrency1_Bucket${bucketIndex}`] = Number(amountAdditional || 0);

        return buckets;
    };

    // =================================================
    // Action
    // =================================================
    this.on('getCustomerAgeingData', async (req) => {
        try {

            const {
                companyCode,
                customerRanges,
                customerAccGrpRanges,
                glAccountRanges,
                profitCentreRanges,
                transactionCurrency,
                keyDate,
                includeSGLItems,
                ageingFrom
            } = req.data;

            if (!companyCode) req.reject(400, 'Company Code mandatory');
            if (!keyDate) req.reject(400, 'Key Date mandatory');

            // =================================================
            // STEP 1: CustomerCompany
            // =================================================
            let customers = [];

            if ((customerRanges?.length || 0) > 0 || (customerAccGrpRanges?.length || 0) > 0) {

                const filters = [`CompanyCode eq '${companyCode}'`];

                const custFilter = buildRangeFilter('Customer', customerRanges);
                if (custFilter) filters.push(custFilter);

                const grpFilter = buildOrFilter('CustomerAccountGroup', customerAccGrpRanges);
                if (grpFilter) filters.push(grpFilter);

                const bpData = await fetchAllPages(
                    config.CUSTOMER_COMPANY.url,
                    getAuthHeader(config.CUSTOMER_COMPANY.username, config.CUSTOMER_COMPANY.password),
                    { $filter: filters.join(' and ') }
                );

                customers = bpData.map(r => r.Customer).filter(Boolean);
                if (customers.length === 0) return [];
            }

            // =================================================
            // STEP 2: GL Line Items
            // =================================================
            const glFilters = [`CompanyCode eq '${companyCode}'`];

            if (customers.length)
                glFilters.push(buildOrFilter('Customer', customers));

            const glAcc = buildRangeFilter('GLAccount', glAccountRanges);
            if (glAcc) glFilters.push(glAcc);

            const pc = buildRangeFilter('ProfitCenter', profitCentreRanges);
            if (pc) glFilters.push(pc);

            if (transactionCurrency)
                glFilters.push(`TransactionCurrency eq '${transactionCurrency}'`);

            glFilters.push(`(ClearingDate gt ${toODataDate(keyDate)} or ClearingDate eq null)`);
            glFilters.push(`PostingDate le ${toODataDate(keyDate)}`);
            glFilters.push(`SourceLedger eq '0L'`);
            glFilters.push(`FinancialAccountType eq 'D'`);
            glFilters.push(`AccountingDocumentType ne ''`);

            if (includeSGLItems)
                glFilters.push(`SpecialGLCode ne ''`);
            else
                glFilters.push(`(SpecialGLCode eq '' or SpecialGLCode eq null)`);

            let glItems = await fetchAllPages(
                config.LINE_ITEM.url,
                getAuthHeader(config.LINE_ITEM.username, config.LINE_ITEM.password),
                {
                    $filter: glFilters.join(' and '),
                    $select: 'CompanyCode,AccountingDocument,FiscalYear'
                }
            );

            if (!glItems.length) return [];

            // =================================================
            // REMOVE DUPLICATES FROM GL ITEMS
            // =================================================
            glItems = Array.from(
                new Map(
                    glItems.map(item => [
                        `${item.CompanyCode}|${item.FiscalYear}|${item.AccountingDocument}`,
                        item
                    ])
                ).values()
            );



            // =================================================
            // STEP 3: Accounting Document Cube
            // =================================================
            const result = [];

            const groups = {};
            for (const r of glItems) {
                const key = `${r.CompanyCode}_${r.FiscalYear}`;
                groups[key] ??= { companyCode: r.CompanyCode, fiscalYear: r.FiscalYear, docs: [] };
                groups[key].docs.push(r.AccountingDocument);
            }

            const docCategories = ['D', 'M', 'S', 'V', 'W', 'Z', 'C', 'O'];

            for (const g of Object.values(groups)) {
                for (const chunk of chunkArray([...new Set(g.docs)], 30)) {

                    const filters = [
                        `CompanyCode eq '${g.companyCode}'`,
                        `FiscalYear eq '${g.fiscalYear}'`,
                        buildOrFilter('AccountingDocument', chunk),
                        `FinancialAccountType eq 'D'`,
                        `AccountingDocumentType ne ''`,
                        `PostingDate le ${toODataDate(keyDate)}`,
                        `(ClearingDate gt ${toODataDate(keyDate)} or ClearingDate eq null)`
                    ];

                    if (customers.length)
                        filters.push(buildOrFilter('Customer', customers));

                    if (transactionCurrency)
                        filters.push(`TransactionCurrency eq '${transactionCurrency}'`);

                    const accData = await fetchAllPages(
                        config.ACCTGDOCITEMCUBE.url,
                        getAuthHeader(config.ACCTGDOCITEMCUBE.username, config.ACCTGDOCITEMCUBE.password),
                        {
                            $filter: filters.join(' and '),
                            $select: [
                                'CompanyCode',
                                'FiscalYear',
                                'AccountingDocument',
                                'AccountingDocumentItem',
                                'ClearingDate',
                                'SpecialGLCode',
                                'DebitCreditCode',
                                'AssignmentReference',
                                'DocumentItemText',
                                'PartnerCompany',
                                'PurchasingDocument',
                                'PurchasingDocumentItem',
                                'BillingDocument',
                                'SalesDocument',
                                'SalesDocumentItem',
                                'GLAccount',
                                'GLAccountLongName',
                                'Customer',
                                'Supplier',
                                'DueCalculationBaseDate',
                                'PaymentTerms',
                                'CashDiscount1Days',
                                'CashDiscount2Days',
                                'NetPaymentDays',
                                'DunningKey',
                                'DunningBlockingReason',
                                'LastDunningDate',
                                'DunningLevel',
                                'DunningArea',
                                'Reference1IDByBusinessPartner',
                                'Reference2IDByBusinessPartner',
                                'CreditControlArea',
                                'BusinessPlace',
                                'FiscalPeriod',
                                'PostingDate',
                                'DocumentDate',
                                'AccountingDocumentType',
                                'NetDueDate',
                                'OffsettingAccount',
                                'OffsettingAccountType',
                                'CompanyCodeCurrency',
                                'AmountInCompanyCodeCurrency',
                                'TransactionCurrency',
                                'AmountInTransactionCurrency',
                                'AdditionalCurrency1',
                                'AmountInAdditionalCurrency1',
                                'AccountingDocCreatedByUser',
                                'AccountingDocumentHeaderText',
                                'AlternativeReferenceDocument',
                                'Segment',
                                'SegmentName',
                                'ProfitCenter',
                                'ProfitCenterName',
                                'AccountingDocumentCategory' // keep if you still filter on it
                            ].join(',')
                        }
                    );

                    result.push(...accData);
                }
            }

            // =================================================
            // REMOVE records with specific AccountingDocumentCategory
            // =================================================
            const excludedDocCategories = new Set(['D', 'M', 'S', 'V', 'W', 'Z', 'C', 'O']);

            const filteredResult = result.filter(r =>
                !excludedDocCategories.has(r.AccountingDocumentCategory)
            );



            // =================================================
            // STEP 5: Fetch additional customer info
            // =================================================
            const customerIds = [...new Set(result.map(r => r.Customer).filter(Boolean))];
            const customerDetails = await fetchCustomerDetails(customerIds);
            const customerMap = new Map(customerDetails.map(c => [c.Customer, c]));


            // Merge customer info into result
            const finalResult = result.map(r => {

                const { __metadata, ...rest } = r;  // <-- remove __metadata

                const cust = customerMap.get(r.Customer) || {};

                const ageInDays = calculateAgeingDays(r, keyDate, ageingFrom);

                // Assign amounts to buckets
                const bucketedAmounts = assignBuckets(
                    ageInDays,
                    r.AmountInCompanyCodeCurrency,
                    r.AmountInTransactionCurrency,
                    r.AmountInAdditionalCurrency1
                );


                return {
                    ...rest,
                    CustomerAccountGroup: cust.CustomerAccountGroup || '',
                    CustomerFullName: cust.CustomerFullName || '',
                    Industry: cust.Industry || '',
                    IndustryCode1: cust.IndustryCode1 || '',
                    IndustryCode2: cust.IndustryCode2 || '',
                    IndustryCode3: cust.IndustryCode3 || '',
                    IndustryCode4: cust.IndustryCode4 || '',
                    IndustryCode5: cust.IndustryCode5 || '',
                    PostingIsBlocked: cust.PostingIsBlocked || '',
                    TradingPartner: '',
                    AgeInDays: ageInDays,
                    ...bucketedAmounts
                };
            });

            console.log(customers.length);
            console.log(glItems.length);
            console.log(result.length);
            console.log(filteredResult.length);

            return finalResult;


        } catch (e) {
            console.error(e.response?.data || e);
            return req.error(500, 'Failed to fetch ageing data');
        }
    });
});
