sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/layout/form/SimpleForm"
], function (
    Controller,
    JSONModel,
    MessageToast,
    Dialog,
    Input,
    Button,
    VBox,
    List,
    StandardListItem,
    SimpleForm
) {
    "use strict";

    return Controller.extend("project1.controller.View1", {


        onInit: function () {
            this.getView().setModel(new JSONModel({
                goEnabled: true
            }), "ui");


            this.byId("ageingGroup").setSelectedIndex(-1);


        },


       

        onPressGo: function () {
            const oView = this.getView();
            let bValid = true;


            const aRequired = [
                oView.byId("companyCodeInput"),
                oView.byId("keyDatePicker")
            ];


            aRequired.forEach(oCtrl => {
                const vVal = oCtrl.isA("sap.m.DatePicker")
                    ? oCtrl.getDateValue()
                    : oCtrl.getValue();

                if (!vVal) {
                    oCtrl.setValueState("Error");
                    oCtrl.setValueStateText("Required");
                    bValid = false;
                } else {
                    oCtrl.setValueState("None");
                }


            });



            const oAgeingGroup = this.byId("ageingGroup");
            if (oAgeingGroup.getSelectedIndex() === -1) {
                MessageToast.show("Please select Ageing From");
                  bValid = false;;
            }


            if (!bValid) {
                MessageToast.show("Please fill all required fields");
                return;
            }


            const aAgeingMap = ["R1", "R2", "R3", "R4", "R5", "R6"];
            const sAgeingFrom = aAgeingMap[oAgeingGroup.getSelectedIndex()];


            const oPayload = {
                companyCode: oView.byId("companyCodeInput").getValue(),

                customerRanges: this._parseRanges(oView.byId("customerInput").getValue()),
                customerAccGrpRanges: this._parseCommaList(
                    oView.byId("custAccGrpInput").getValue()
                ),
                glAccountRanges: this._parseRanges(
                    oView.byId("glAccountInput").getValue()
                ),
                profitCentreRanges: this._parseRanges(
                    oView.byId("profitCentreInput").getValue()
                ),

                transactionCurrency: oView.byId("currencyInput").getValue() || "INR",

                keyDate: this._formatLocalDate(
                    oView.byId("keyDatePicker").getDateValue()
                ),

                includeSGLItems: oView.byId("includeSGL").getSelected(),
                ageingFrom: sAgeingFrom
            };

            console.log("Payload Sent to CAP:", oPayload);

            this.getOwnerComponent().setModel(
                new sap.ui.model.json.JSONModel(oPayload),
                "filterModel"
            );

            sap.ui.core.UIComponent.getRouterFor(this)
                .navTo("RouteDescription");
        },




        _openRangeDialog: function (oInput, sTitle) {
            this._oRangeInput = oInput;

            if (!this._oRangeDialog) {
                this._oFromInput = new sap.m.Input({
                    placeholder: "From",
                    width: "100%"
                });

                this._oToInput = new sap.m.Input({
                    placeholder: "To",
                    width: "100%"
                });

                this._oRangeList = new sap.m.List({
                    mode: "Delete",
                    delete: oEvt => {
                        this._oRangeList.removeItem(oEvt.getParameter("listItem"));
                    }
                });

                this._oFromInput.setWidth("250px");
                this._oToInput.setWidth("250px");

                this._oRangeDialog = new sap.m.Dialog({
                    title: sTitle,
                    contentWidth: "650px",
                    draggable: true,
                    resizable: true,
                    content: new sap.ui.layout.form.SimpleForm({
                        editable: true,
                        layout: "ResponsiveGridLayout",
                        columnsXL: 1,
                        columnsL: 1,
                        columnsM: 1,
                        content: [

                            new sap.m.HBox({
                                width: "100%",
                                alignItems: "Center",
                                items: [
                                    new sap.m.VBox({
                                        width: "250px",
                                        items: [this._oFromInput]
                                    }).addStyleClass("sapUiSmallMarginEnd"),

                                    new sap.m.VBox({
                                        width: "250px",
                                        items: [this._oToInput]
                                    })
                                ]
                            }),

                            new sap.m.Toolbar({
                                content: [
                                    new sap.m.ToolbarSpacer(),
                                    new sap.m.Button({
                                        text: "Add",
                                        type: "Emphasized",
                                        press: this._onAddRange.bind(this)
                                    })
                                ]
                            }),

                            this._oRangeList
                        ]
                    }),
                    beginButton: new sap.m.Button({
                        text: "OK",
                        press: this._onConfirmRanges.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: () => this._oRangeDialog.close()
                    })
                }),


                    this.getView().addDependent(this._oRangeDialog);
            }


            this._oRangeDialog.setTitle(sTitle);
            this._oRangeList.removeAllItems();

            const sExistingValue = oInput.getValue();
            if (sExistingValue) {
                sExistingValue.split(",").forEach(v => {
                    this._oRangeList.addItem(
                        new sap.m.StandardListItem({ title: v.trim() })
                    );
                });
            }

            this._oFromInput.setValue("");
            this._oToInput.setValue("");

            this._oRangeDialog.open();
        },

        onGLF4: function (oEvent) {
            this._openRangeDialog(oEvent.getSource(), "GL Account");
        },

        onCustomerF4: function (oEvent) {
            this._openRangeDialog(oEvent.getSource(), "Customer");
        },

        onProfitCentreF4: function (oEvent) {
            this._openRangeDialog(oEvent.getSource(), "Profit Centre");
        },


        



        _onAddRange: function () {
            let sFrom = this._oFromInput.getValue().trim();
            let sTo = this._oToInput.getValue().trim();

            if (!sFrom) {
                sap.m.MessageToast.show("Enter From value");
                return;
            }


            if (!sTo) {
                sTo = sFrom;
            }

            if (sTo < sFrom) {
                sap.m.MessageToast.show("To cannot be less than From");
                return;
            }

            const sText = `${sFrom}-${sTo}`;

            this._oRangeList.addItem(
                new sap.m.StandardListItem({ title: sText })
            );

            this._oFromInput.setValue("");
            this._oToInput.setValue("");
        },

        _onConfirmRanges: function () {
            const aRanges = this._oRangeList.getItems().map(oItem => oItem.getTitle());
            this._oRangeInput.setValue(aRanges.join(","));
            this._oRangeInput.setValueState("None");
            this._oRangeDialog.close();
        },





        _parseRanges: function (sValue) {
            if (!sValue) {
                return [];
            }

            return sValue.split(",").map(v => {
                const a = v.split("-");
                return {
                    low: a[0],
                    high: a[1] || a[0]
                };
            });
        },

        _parseCommaList: function (sValue) {
            return sValue
                ? sValue.split(",").map(v => v.trim()).filter(Boolean)
                : [];
        },

        _formatLocalDate: function (oDate) {
            const yyyy = oDate.getFullYear();
            const mm = String(oDate.getMonth() + 1).padStart(2, "0");
            const dd = String(oDate.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },


        onLiveChange: function (oEvent) {
            const oCtrl = oEvent.getSource();
            if (oCtrl.getValue()) {
                oCtrl.setValueState("None");
            }
        },

        onDateChange: function (oEvent) {
            const oDP = oEvent.getSource();
            if (oDP.getDateValue()) {
                oDP.setValueState("None");
            }
        }

    });
});
