sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/CheckBox",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/VBox",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
], function (
    Controller,
    Dialog,
    Button,
    CheckBox,
    List,
    StandardListItem,
    VBox,
    Text,
    Spreadsheet,
    library,
    JSONModel
) {
    "use strict";

    return Controller.extend("project1.controller.Description", {


        _filterConfig: [
            {
                name: "CompanyCode",
                label: "Company Code",
                visible: true
            },
            { name: "FiscalYear", label: "Fiscal Year", visible: true },
            { name: "AccountingDocument", label: "Accounting Document", visible: true },
            { name: "AccountingDocumentItem", label: "Accounting Doc Item", visible: true },

            { name: "SpecialGLCode", label: "Special GL Code", visible: false },
            { name: "DebitCreditCode", label: "Debit/Credit", visible: false },
            { name: "AssignmentReference", label: "Assignment Reference", visible: false },
            { name: "DocumentItemText", label: "Document Item Text", visible: false },
            { name: "PartnerCompany", label: "Partner Company", visible: false },
            { name: "BillingDocument", label: "Billing Document", visible: false },
            { name: "SalesDocument", label: "Sales Document", visible: false },
            { name: "SalesDocumentItem", label: "Sales Doc Item", visible: false },
            { name: "GLAccount", label: "GL Account", visible: false },
            { name: "GLAccountLongName", label: "GL Account Name", visible: false },
            { name: "Customer", label: "Customer", visible: false },
            { name: "Supplier", label: "Supplier", visible: false },





            { name: "PaymentTerms", label: "Payment Terms", visible: false },
            { name: "CashDiscount1Days", label: "Cash Discount 1 Days", visible: false },
            { name: "CashDiscount2Days", label: "Cash Discount 2 Days", visible: false },
            { name: "NetPaymentDays", label: "Net Payment Days", visible: false },


            { name: "DunningKey", label: "Dunning Key", visible: false },
            { name: "DunningBlockingReason", label: "Dunning Block Reason", visible: false },

            { name: "DunningLevel", label: "Dunning Level", visible: false },
            { name: "DunningArea", label: "Dunning Area", visible: false },
            { name: "PurchasingDocument", label: "Purchasing Document", visible: false },
            { name: "PurchasingDocumentItem", label: "Purchasing Document Item", visible: false },
            { name: "ProfitCenter", label: "Profit Center", visible: false },
            { name: "ProfitCenterName", label: "Profit Center Name", visible: false },
            { name: "Reference1IDByBusinessPartner", label: "Reference 1", visible: false },
            { name: "Reference2IDByBusinessPartner", label: "Reference 2", visible: false },
            { name: "CreditControlArea", label: "Credit Control Area", visible: false },
            { name: "BusinessPlace", label: "Business Place", visible: false },
            { name: "Segment", label: "Segment", visible: false },
            { name: "SegmentName", label: "Segment Name", visible: false },
            { name: "FiscalPeriod", label: "Fiscal Period", visible: false },
            { name: "AccountingDocumentCategory", label: "Accounting Document Category", visible: false },

            { name: "AccountingDocumentType", label: "Accounting Document Type", visible: false },
            { name: "ClearingDate", label: "Clearing Date", visible: true, type: "DatePicker", dataType: "date" },
            { name: "DueCalculationBaseDate", label: "Due Calculation Date", visible: false, type: "DatePicker", dataType: "date" },
            { name: "LastDunningDate", label: "Last Dunning Date", visible: false, type: "DatePicker", dataType: "date" },
            { name: "PostingDate", label: "Posting Date", visible: false, type: "DatePicker", dataType: "date" },
            { name: "DocumentDate", label: "Document Date", visible: false, type: "DatePicker", dataType: "date" },
            { name: "NetDueDate", label: "Net Due Date", visible: false, type: "DatePicker", dataType: "date" },

            { name: "OffsettingAccount", label: "Offsetting Account", visible: false },
            { name: "OffsettingAccountType", label: "Offsetting Account Type", visible: false },
            { name: "CompanyCodeCurrency", label: "Company Code Currency", visible: false },
            { name: "AmountInCompanyCodeCurrency", label: "Amount in Company Code Currency", visible: false },
            { name: "TransactionCurrency", label: "Transaction Currency", visible: false },
            { name: "AmountInTransactionCurrency", label: "Amount in Transaction Currency", visible: false },
            { name: "AdditionalCurrency1", label: "Additional Currency 1", visible: false },
            { name: "AmountInAdditionalCurrency1", label: "Amount in Additional Currency 1", visible: false },
            { name: "AccountingDocCreatedByUser", label: "Created By User", visible: false },
            { name: "AccountingDocumentHeaderText", label: "Document Header Text", visible: false },
            { name: "AlternativeReferenceDocument", label: "Alternative Reference Document", visible: false },
            { name: "CustomerAccountGroup", label: "Customer Account Group", visible: false },
            { name: "CustomerFullName", label: "Customer Full Name", visible: false },
            { name: "Industry", label: "Industry", visible: false },
            { name: "IndustryCode1", label: "Industry Code 1", visible: false },
            { name: "IndustryCode2", label: "Industry Code 2", visible: false },
            { name: "IndustryCode3", label: "Industry Code 3", visible: false },
            { name: "IndustryCode4", label: "Industry Code 4", visible: false },
            { name: "IndustryCode5", label: "Industry Code 5", visible: false },
            { name: "PostingIsBlocked", label: "Posting Is Blocked", visible: false },
            { name: "TradingPartner", label: "Trading Partner", visible: false },
            { name: "AgeInDays", label: "Age (Days)", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket0", label: "CCY Bucket 0", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket1", label: "CCY Bucket 1", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket2", label: "CCY Bucket 2", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket3", label: "CCY Bucket 3", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket4", label: "CCY Bucket 4", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket5", label: "CCY Bucket 5", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket6", label: "CCY Bucket 6", visible: false, dataType: "number" },

            { name: "AmountInTransactionCurrency_Bucket0", label: "Txn CCY Bucket 0", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket1", label: "Txn CCY Bucket 1", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket2", label: "Txn CCY Bucket 2", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket3", label: "Txn CCY Bucket 3", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket4", label: "Txn CCY Bucket 4", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket5", label: "Txn CCY Bucket 5", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket6", label: "Txn CCY Bucket 6", visible: false, dataType: "number" },

            { name: "AmountInAdditionalCurrency1_Bucket0", label: "Addl CCY Bucket 0", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket1", label: "Addl CCY Bucket 1", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket2", label: "Addl CCY Bucket 2", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket3", label: "Addl CCY Bucket 3", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket4", label: "Addl CCY Bucket 4", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket5", label: "Addl CCY Bucket 5", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket6", label: "Addl CCY Bucket 6", visible: false, dataType: "number" }




        ],

        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDescription").attachPatternMatched(this._onRouteMatched, this);

            const oUIModel = new sap.ui.model.json.JSONModel({ showTable: true });
            this.getView().setModel(oUIModel, "ui");
            this._createDynamicFilters();

            const oResultModel = new sap.ui.model.json.JSONModel({ CustomerAgeing: [], nDataLength: 0 });
            this.getView().setModel(oResultModel, "docs");

        },

        _onRouteMatched: function () {
            // Read filter model from component
            const oFilterModel = this.getOwnerComponent().getModel("filterModel");
            if (!oFilterModel) {
                console.error("filterModel not found");
                return;
            }

            const oPayload = oFilterModel.getData();
            console.log("Received Payload in Description:", oPayload);

            // Call backend using this payload
            this._callBackend(oPayload);
        },
        


        onOpenPersonalization: function () {
            if (!this._oDialog) {
                const oTable = this.byId("lineItemsTable");

                this._aColumns = oTable.getColumns();

                const aItems = this._aColumns.map(oCol => {
                    return new StandardListItem({
                        title: oCol.getLabel().getText(),
                        selected: oCol.getVisible()
                    });
                });

                this._oSelectAll = new CheckBox({
                    text: "Select All",
                    selected: aItems.every(i => i.getSelected()),
                    select: (oEvent) => {
                        const bSelected = oEvent.getParameter("selected");
                        aItems.forEach(i => i.setSelected(bSelected));
                        this._updateSelectedCount();
                    }
                });

                this._oList = new List({
                    mode: "MultiSelect",
                    items: aItems,
                    selectionChange: () => {
                        const bAllSelected = this._oList
                            .getItems()
                            .every(i => i.getSelected());
                        this._oSelectAll.setSelected(bAllSelected);
                        this._updateSelectedCount();
                    }
                });

                this._oSelectedCountText = new Text();

                this._oDialog = new Dialog({
                    title: "Select Columns",
                    contentWidth: "520px",
                    content: new VBox({
                        items: [
                            this._oSelectAll,
                            this._oSelectedCountText,
                            this._oList
                        ]
                    }),
                    beginButton: new Button({
                        text: "OK",
                        press: this._onConfirmColumnSelection.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancel",
                        press: () => this._oDialog.close()
                    })
                });

                this.getView().addDependent(this._oDialog);
            }

            this._updateSelectedCount();
            this._oDialog.open();
        },

        _updateSelectedCount: function () {
            const iCount = this._oList.getItems().filter(i => i.getSelected()).length;
            this._oSelectedCountText.setText("Selected Columns: " + iCount);
        },

        _onConfirmColumnSelection: function () {
            const aSelectedTitles = this._oList
                .getSelectedItems()
                .map(i => i.getTitle());

            this._aColumns.forEach(oCol => {
                oCol.setVisible(
                    aSelectedTitles.includes(oCol.getLabel().getText())
                );
            });

            this._oDialog.close();
        },

        _applyFilters: function () {
            const oTable = this.byId("lineItemsTable");
            if (!oTable) return;

            const oBinding = oTable.getBinding("rows");
            if (!oBinding) return;

            const oFilterBar = this.byId("filterBar");
            const aFilters = [];

            if (!oFilterBar) {
                const aAllData = oBinding.getContexts();
                this.getView().getModel("docs").setProperty("/nDataLength", aAllData.length);
                return;
            }

            oFilterBar.getFilterItems().forEach(oItem => {
                const sPath = oItem.getName();
                const oControl = oItem.getControl();
                const sValue = oControl.getValue();

                if (sValue) {
                    let oFilter;
                    const oCfg = this._filterConfig.find(c => c.name === sPath);

                    if (oCfg?.dataType === "date" || oControl instanceof sap.m.DatePicker) {
                        const oDate = new Date(sValue);
                        const iMillis = oDate.getTime();
                        const sFormatted = `/Date(${iMillis})/`;

                        oFilter = new sap.ui.model.Filter(
                            sPath,
                            sap.ui.model.FilterOperator.EQ,
                            sFormatted
                        );
                    }
                    else if (oCfg?.dataType === "number") {
                        oFilter = new sap.ui.model.Filter(
                            sPath,
                            sap.ui.model.FilterOperator.EQ,
                            Number(sValue)
                        );

                    } else if (oCfg?.dataType === "boolean") {
                        oFilter = new sap.ui.model.Filter(
                            sPath,
                            sap.ui.model.FilterOperator.EQ,
                            sValue === "true"
                        );

                    } else {
                        
                        oFilter = new sap.ui.model.Filter(
                            sPath,
                            sap.ui.model.FilterOperator.Contains,
                            sValue
                        );
                    }


                    aFilters.push(oFilter);
                }
            });

            oBinding.filter(aFilters);




            const iFilteredCount = oBinding.getLength();

            this.getView().getModel("docs")
                .setProperty("/nDataLength", iFilteredCount);

            console.log("Filtered record count --->", iFilteredCount);

        },
        _createDynamicFilters: function () {
            const oFilterBar = this.byId("filterBar");
            if (!oFilterBar) return;
         

            this._filterConfig.forEach(cfg => {
                let oControl;


                if (cfg.type === "DatePicker") {
                    oControl = new sap.m.DatePicker({
                        valueFormat: "yyyy-MM-dd",
                        displayFormat: "yyyy-MM-dd",
                        change: this._applyFilters.bind(this)
                    });
                } else {
                    oControl = new sap.m.Input({
                        liveChange: this._applyFilters.bind(this)
                    });
                }


                const oFilterItem = new sap.ui.comp.filterbar.FilterItem({
                    name: cfg.name,
                    label: cfg.label,
                    visibleInFilterBar: cfg.visible,
                    control: oControl
                });

                oFilterBar.addFilterItem(oFilterItem);
            });
        },


       

        formatDate: function (sDate) {
            if (!sDate) return "";
            try {
                var iMillis = parseInt(sDate.replace(/\/Date\((\d+)\)\//, "$1"));
                var oDate = new Date(iMillis);
                var yyyy = oDate.getFullYear();
                var mm = String(oDate.getMonth() + 1).padStart(2, "0");
                var dd = String(oDate.getDate()).padStart(2, "0");
                return yyyy + "-" + mm + "-" + dd;
            } catch (e) {
                return sDate;
            }
        },

        _callBackend: function (oPayload) {
            const that = this;

            sap.ui.core.BusyIndicator.show(0);

            $.ajax({
                url: "/odata/v4/custageingservice/getCustomerAgeingData",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: (oResponse) => { 
                    console.log("Backend Response:", oResponse);


                    const result = oResponse.value || oResponse.result || [];
                    this.getView().getModel("docs").setProperty("/CustomerAgeing", result);
                    console.log("total row found------>", result.length)
                    this.getView().getModel("docs").setProperty("/nDataLength", result.length);

                   

                },
                error: function (oError) {
                    console.error("Backend Error:", oError);

                    sap.m.MessageBox.error(
                        oError?.responseJSON?.error?.message || "Failed to fetch data"
                    );
                },
                complete: function () {
                    sap.ui.core.BusyIndicator.hide();
                }



            });


        },

        //         onPressDownload: function () {
        //     const oTable = this.byId("lineItemsTable");
        //     if (!oTable) return;

        //     const oBinding = oTable.getBinding("rows");
        //     if (!oBinding) return;


        //     const aContexts = oBinding.getContexts(0, oBinding.getLength());


        //     const aData = aContexts.map(oCtx => oCtx.getObject());

        //     if (!aData.length) {
        //         sap.m.MessageToast.show("No data to download");
        //         return;
        //     }

        //     const aColumns = this._getExcelColumns();

        //     const oSettings = {
        //         workbook: {
        //             columns: aColumns
        //         },
        //         dataSource: aData,
        //         fileName: "Customer_Ageing.xlsx"
        //     };

        //     const oSheet = new sap.ui.export.Spreadsheet(oSettings);
        //     oSheet.build().finally(() => oSheet.destroy());
        // }
        // ,
        // _getExcelColumns: function () {
        //     return [
        //         { label: "Company Code", property: "CompanyCode" },
        //         { label: "Fiscal Year", property: "FiscalYear" },
        //         { label: "Accounting Document", property: "AccountingDocument" },
        //         { label: "Accounting Document Item", property: "AccountingDocumentItem" },
        //         { label: "Clearing Date", property: "ClearingDate", type: "date" },
        //         { label: "Special GL Code", property: "SpecialGLCode" },
        //         { label: "Debit / Credit Indicator", property: "DebitCreditCode" },
        //         { label: "Assignment Reference", property: "AssignmentReference" },
        //         { label: "Document Item Text", property: "DocumentItemText" },
        //         { label: "Partner Company", property: "PartnerCompany" },

        //         { label: "Purchase Order", property: "PurchasingDocument" },
        //         { label: "Purchase Order Item", property: "PurchasingDocumentItem" },
        //         { label: "Billing Document", property: "BillingDocument" },
        //         { label: "Sales Order", property: "SalesDocument" },
        //         { label: "Sales Order Item", property: "SalesDocumentItem" },

        //         { label: "GL Account", property: "GLAccount" },
        //         { label: "GL Account Name", property: "GLAccountLongName" },
        //         { label: "Customer", property: "Customer" },
        //         { label: "Supplier", property: "Supplier" },

        //         { label: "Baseline Date", property: "DueCalculationBaseDate", type: "date" },
        //         { label: "Payment Terms", property: "PaymentTerms" },
        //         { label: "Cash Discount 1 Days", property: "CashDiscount1Days" },
        //         { label: "Cash Discount 2 Days", property: "CashDiscount2Days" },
        //         { label: "Net Payment Days", property: "NetPaymentDays" },

        //         { label: "Dunning Key", property: "DunningKey" },
        //         { label: "Dunning Blocking Reason", property: "DunningBlockingReason" },
        //         { label: "Last Dunning Date", property: "LastDunningDate", type: "date" },
        //         { label: "Dunning Level", property: "DunningLevel" },
        //         { label: "Dunning Area", property: "DunningArea" },

        //         { label: "Reference 1", property: "Reference1IDByBusinessPartner" },
        //         { label: "Reference 2", property: "Reference2IDByBusinessPartner" },

        //         { label: "Credit Control Area", property: "CreditControlArea" },
        //         { label: "Business Place", property: "BusinessPlace" },
        //         { label: "Fiscal Period", property: "FiscalPeriod" },

        //         { label: "Posting Date", property: "PostingDate", type: "date" },
        //         { label: "Document Date", property: "DocumentDate", type: "date" },
        //         { label: "Accounting Document Type", property: "AccountingDocumentType" },
        //         { label: "Net Due Date", property: "NetDueDate", type: "date" },

        //         { label: "Offsetting Account", property: "OffsettingAccount" },
        //         { label: "Offsetting Account Type", property: "OffsettingAccountType" },

        //         { label: "Company Code Currency", property: "CompanyCodeCurrency" },
        //         { label: "Amount In Company Code Currency", property: "AmountInCompanyCodeCurrency", type: "number" },

        //         { label: "Transaction Currency", property: "TransactionCurrency" },
        //         { label: "Amount In Transaction Currency", property: "AmountInTransactionCurrency", type: "number" },

        //         { label: "Additional Currency 1", property: "AdditionalCurrency1" },
        //         { label: "Amount In Additional Currency 1", property: "AmountInAdditionalCurrency1", type: "number" },

        //         { label: "Created By User", property: "AccountingDocCreatedByUser" },
        //         { label: "Document Header Text", property: "AccountingDocumentHeaderText" },
        //         { label: "Alternative Reference Document", property: "AlternativeReferenceDocument" },

        //         { label: "Segment", property: "Segment" },
        //         { label: "Segment Name", property: "SegmentName" },
        //         { label: "Profit Center", property: "ProfitCenter" },
        //         { label: "Profit Center Name", property: "ProfitCenterName" },

        //         { label: "Customer Account Group", property: "CustomerAccountGroup" },
        //         { label: "Customer Full Name", property: "CustomerFullName" },

        //         { label: "Industry", property: "Industry" },
        //         { label: "Industry Code 1", property: "IndustryCode1" },
        //         { label: "Industry Code 2", property: "IndustryCode2" },
        //         { label: "Industry Code 3", property: "IndustryCode3" },
        //         { label: "Industry Code 4", property: "IndustryCode4" },
        //         { label: "Industry Code 5", property: "IndustryCode5" },

        //         { label: "Posting Is Blocked", property: "PostingIsBlocked" },
        //         { label: "Trading Partner", property: "TradingPartner" },

        //         { label: "Age in Days", property: "AgeInDays", type: "number" },

        //         // ===== Aging Buckets – Company Code Currency =====
        //         { label: "AmountInCompanyCodeCurrency - Not Due", property: "AmountInCompanyCodeCurrency_Bucket0", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days 0 - Day1", property: "AmountInCompanyCodeCurrency_Bucket1", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days Day1+1 - Day2", property: "AmountInCompanyCodeCurrency_Bucket2", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days Day2+1 - Day3", property: "AmountInCompanyCodeCurrency_Bucket3", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days Day3+1 - Day4", property: "AmountInCompanyCodeCurrency_Bucket4", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days Day4+1 - Day5", property: "AmountInCompanyCodeCurrency_Bucket5", type: "number" },
        //         { label: "AmountInCompanyCodeCurrency - Days Day5+", property: "AmountInCompanyCodeCurrency_Bucket6", type: "number" },

        //         // ===== Aging Buckets – Transaction Currency =====
        //         { label: "AmountInTransactionCurrency - Not Due", property: "AmountInTransactionCurrency_Bucket0", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days 0 - Day1", property: "AmountInTransactionCurrency_Bucket1", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days Day1+1 - Day2", property: "AmountInTransactionCurrency_Bucket2", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days Day2+1 - Day3", property: "AmountInTransactionCurrency_Bucket3", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days Day3+1 - Day4", property: "AmountInTransactionCurrency_Bucket4", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days Day4+1 - Day5", property: "AmountInTransactionCurrency_Bucket5", type: "number" },
        //         { label: "AmountInTransactionCurrency - Days Day5+", property: "AmountInTransactionCurrency_Bucket6", type: "number" },

        //         // ===== Aging Buckets – Additional Currency 1 =====
        //         { label: "AmountInAdditionalCurrency1 - Not Due", property: "AmountInAdditionalCurrency1_Bucket0", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days 0 - Day1", property: "AmountInAdditionalCurrency1_Bucket1", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days Day1+1 - Day2", property: "AmountInAdditionalCurrency1_Bucket2", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days Day2+1 - Day3", property: "AmountInAdditionalCurrency1_Bucket3", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days Day3+1 - Day4", property: "AmountInAdditionalCurrency1_Bucket4", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days Day4+1 - Day5", property: "AmountInAdditionalCurrency1_Bucket5", type: "number" },
        //         { label: "AmountInAdditionalCurrency1 - Days Day5+", property: "AmountInAdditionalCurrency1_Bucket6", type: "number" }
        //     ];
        // },


        onPressDownload: function () {
            const oTable = this.byId("lineItemsTable");
            if (!oTable) return;

            const oBinding = oTable.getBinding("rows");
            if (!oBinding) return;


            const aContexts = oBinding.getContexts(0, oBinding.getLength());
            const aData = aContexts.map(oCtx => oCtx.getObject());

            if (!aData.length) {
                sap.m.MessageToast.show("No data to download");
                return;
            }


            const aColumns = this._getExcelColumns();

            const oSheet = new sap.ui.export.Spreadsheet({
                workbook: { columns: aColumns },
                dataSource: aData,
                fileName: "Customer_Ageing.xlsx"
            });

            oSheet.build().finally(() => oSheet.destroy());
        },
        _getExcelColumns: function () {
            const oTable = this.byId("lineItemsTable");
            if (!oTable) return [];

            const aExcelColumns = [];

            oTable.getColumns().forEach(oCol => {


                if (!oCol.getVisible()) {
                    return;
                }

                const oTemplate = oCol.getTemplate();
                let sProperty = "";

              
                if (oTemplate?.getBindingInfo("text")) {
                    sProperty = oTemplate.getBindingInfo("text").parts[0].path;
                } else if (oTemplate?.getBindingInfo("value")) {
                    sProperty = oTemplate.getBindingInfo("value").parts[0].path;
                }

                if (!sProperty) return;

                aExcelColumns.push({
                    label: oCol.getLabel()?.getText() || sProperty,
                    property: sProperty
                });
            });

            return aExcelColumns;
        },




        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteView1");
        }

    });
});
