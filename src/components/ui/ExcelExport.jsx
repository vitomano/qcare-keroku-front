import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';
import ReactExport from "react-data-export";
import { itemValor } from '../../helpers/eliminarEs';




export const ExcelExport = ({ mainData, pallets }) => {

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


    const DataSet = [
        {
            //xSteps: 1, // Will start putting cell with 1 empty cell on left most
            columns: [
                { title: "Pallet Ref", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Product", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in characters
                { title: "Format", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Supplier", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Origin", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "GLN/GGN", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Variety", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in characters
                { title: "Total Boxes", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Total Pallets", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Quality", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Transport", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Purchase Order", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Delivery Note", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Warehouse", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels
                { title: "Format gr", style: { font: { sz: "16", bold: true } }, width: { wpx: 250 } }, // width in pixels

            ],
            data: [
                [{ value: mainData.pallet_ref || "--", style: { font: { sz: "14" } } },
                { value: mainData.product || "--", style: { font: { sz: "14" } } },
                { value: mainData.format || "--", style: { font: { sz: "14" } } },
                { value: mainData.supplier || "--", style: { font: { sz: "14" } } },
                { value: mainData.origin || "--", style: { font: { sz: "14" } } },
                { value: mainData.gln_ggn || "--", style: { font: { sz: "14" } } },
                { value: mainData.variety || "--", style: { font: { sz: "14" } } },
                { value: mainData.total_boxes || "--", style: { font: { sz: "14" } } },
                { value: mainData.total_pallets || "--", style: { font: { sz: "14" } } },
                { value: mainData.quality || "--", style: { font: { sz: "14" } } },
                { value: mainData.transport || "--", style: { font: { sz: "14" } } },
                { value: mainData.purchase_order || "--", style: { font: { sz: "14" } } },
                { value: mainData.delivery_note || "--", style: { font: { sz: "14" } } },
                { value: mainData.warehouse || "--", style: { font: { sz: "14" } } },
                { value: mainData.format_gr || "--", style: { font: { sz: "14" } } },]

            ]
        },
    ]


    let sheets = []

    for (let i = 0; pallets.length > i; i++) {

        let sheet = []

        let datosLabels = {
            ySteps: 3,
            columns: [{ title: "Labels" }],
            data: []
        }

        let datosApp = {
            ySteps: 3,
            columns: [{ title: "Appareance" }],
            data: []
        }

        let datosPallGrow = {
            ySteps: 3,
            columns: [{ title: "Pall/Grow" }],
            data: []
        }

        let arrLabels = []
        let arrApp = []
        let arrPallGrow = []

        for (let palle of pallets[i].details.labels) {
            arrLabels.push([{ value: palle.label || "--" }, { value: itemValor(palle.valor) || "--" }])
        }

        for (let palleApp of pallets[i].details.appareance) {
            arrApp.push([{ value: palleApp.label || "--" }, { value: itemValor(palleApp.valor) || "--" }])
        }

        for (let pallePallGrow of pallets[i].details.pallgrow) {
            arrPallGrow.push([{ value: pallePallGrow.label || "--" }, { value: itemValor(pallePallGrow.valor) || "--" }])
        }

        datosLabels.data = arrLabels
        datosApp.data = arrApp
        datosPallGrow.data = arrPallGrow

        sheet.push(datosLabels)
        sheet.push(datosApp)
        sheet.push(datosPallGrow)

        sheets.push(sheet)

    }

    return (
        <ExcelFile filename={`Report-${mainData.pallet_ref || "N"}`} element={
                <div className="flex" >
                    <img src="/assets/img/excel-logo.svg" alt="export-data" />
                    <p>Export Data</p>
                </div>
        }>
            <ExcelSheet dataSet={DataSet} name="Main Data" />

            {
                sheets !== [] &&

                sheets.map((sheet, i) => (
                    <ExcelSheet key={i} dataSet={sheet} name={`Pallet ${i + 1}`} />
                ))

            }
        </ExcelFile>
    )
}
