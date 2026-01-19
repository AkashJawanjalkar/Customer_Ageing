@impl: 'srv/custageing.js'
service custageingservice {

    action getCustomerAgeingData(companyCode: String,

                                 glAccountRanges: array of Range, 
                                 customerRanges: array of Range,
                                 customerAccGrpRanges: array of String, 
                                 profitCentreRanges: array of Range,

                                 transactionCurrency: String,
                                 keyDate: Date,
                                 includeSGLItems: Boolean,
                                 ageingFrom: AgeingFrom) returns array of CustomerData;
}

type Range {
    low  : String;
    high : String;
}

type AgeingFrom : String enum {
    NET_DUE_DATE = 'R1';
    POSTING_DATE_PMT_DAYS = 'R2';
    DOCUMENT_DATE_PMT_DAYS = 'R3';
    BASELINE_DATE = 'R4';
    POSTING_DATE = 'R5';
    DOCUMENT_DATE = 'R6';
}

type CustomerData {
    Customer             : String;
    CustomerName         : String;
    CompanyCode          : String;
    CustomerAccountGroup : String;
// ... add other fields you need
}
