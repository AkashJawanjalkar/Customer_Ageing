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
            { name: "AmountInCompanyCodeCurrency_Not Due", label: "Amt.CC.Currency Not Due", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket1", label: "Amt.CC.Currency-0-30", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket2", label: "Amt.CC.Currency-31-60", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket3", label: "Amt.CC.Currency-61-90", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket4", label: "Amt.CC.Currency-91-180", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket5", label: "Amt.CC.Currency-181-365", visible: false, dataType: "number" },
            { name: "AmountInCompanyCodeCurrency_Bucket6", label: "Amt.CC.Currency-365+", visible: false, dataType: "number" },

            { name: "AmountInTransactionCurrency_Not Due", label: "Amt.Txn.Currency Not Due", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket1", label: "Amt.Txn.Currency-0-30", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket2", label: "Amt.Txn.Currency-31-60", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket3", label: "Amt.Txn.Currency-61-90", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket4", label: "Amt.Txn.Currency-91-180", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket5", label: "Amt.Txn.Currency-181-365", visible: false, dataType: "number" },
            { name: "AmountInTransactionCurrency_Bucket6", label: "Amt.Txn.Currency-365+", visible: false, dataType: "number" },



            { name: "AmountInAdditionalCurrency1_Bucket0", label: "Amt.Addl.Currency1 Not Due", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket1", label: "Amt.Addl.Currency1-0-30", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket2", label: "Amt.Addl.Currency1-31-60", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket3", label: "Amt.Addl.Currency1-61-90", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket4", label: "Amt.Addl.Currency1-91-180", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket5", label: "Amt.Addl.Currency1-181-365", visible: false, dataType: "number" },
            { name: "AmountInAdditionalCurrency1_Bucket6", label: "Amt.Addl.Currency1-365+", visible: false, dataType: "number" },




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
