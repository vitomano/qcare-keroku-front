import React, { useState } from 'react'
import Papa from 'papaparse'
// import { tituloEs, valorEs } from '../../helpers/eliminarEs'
import qcareApi from '../../api/qcareApi'


export const NewIntake = ({ history }) => {

    // const [cvsFile, setCsvFile] = useState([])
    const [csvJson, setCsvJson] = useState([])


    const handleCvs = (e) => {
        const file = e.target.files[0]

        if (file) {
            Papa.parse(file, {
                header: true,
                encoding: 'UTF-8',
                transformHeader: (headerName) => headerName.toLowerCase(),
                complete: function (results) {

                    let newCsvJson = []

                    for (let item of results.data) {
                        newCsvJson.push({
                            product: item.product || "",
                            pallet_ref: item['pallet-reference'] || item['pallet-ref'] || item.pallet || "",
                            format: item.format || "",
                            supplier: item.supplier || "",
                            grower: item.grower || "",
                            origin: item.origin || "",
                            gln_ggn: item['gln/ggn number'] || "",
                            variety: item['variety(ies)'] || "",
                            unit_label: item['unit label'] || "",
                            total_boxes: item['total boxes'] || "",
                            total_pallets: item['total pallets'] || 0,
                            quality: item.quality || "",
                            transport: item.transport || "",
                            purchase_order: item['purchase order'] || "",
                            delivery_note: item['delivery note / awb number'] || "",
                            warehouse: item.warehouse || ""
                        })
                    }

                    setCsvJson(newCsvJson)

                }
            });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        await qcareApi.post('/intakes/new', csvJson)

        history.push('/intakes')
    }


    return (
        <div className="content intake">

            <main className="container">

                <h2 className="main-title mb-2">New Intake</h2>

                <label className="upload-label mb-2 excel">
                    <img src="/assets/img/csv.svg" alt="excel-logo" />

                    <span>Choose a CSV File</span>
                    <input
                        type="file"
                        className="upload-btn"
                        accept=".csv"
                        id="cvsFile"
                        onChange={handleCvs}
                    />
                </label>


                <form onSubmit={handleSubmit}>
                    {
                        csvJson.length > 0 &&

                        csvJson.map((cvs, i) => (
                            <div key={i} className="intake__card mb-1">
                                <div className="intake__input">
                                    <strong className="label-title">Pallet</strong>
                                    <strong className="input-text">{cvs.pallet_ref}</strong>
                                </div>

                                <div className="intake__input">
                                    <label>Product</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.product}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Format</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.format}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Supplier</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.supplier}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>

                                <div className="intake__input">
                                    <label>Grower</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.grower}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>

                                <div className="intake__input">
                                    <label>Origin</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.origin}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>GLN/GGN</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.gln_ggn}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Variety(ies)</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.variety}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Unit Label</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.unit_label}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Total Boxes</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.total_boxes}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Total Pallets</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.total_pallets}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Quality</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.quality}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Transport</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.transport}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Purchase Order</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.purchase_order}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Delivery Note / AWB Number</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.delivery_note}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                                <div className="intake__input">
                                    <label>Warehouse</label>
                                    <input
                                        disabled
                                        type="text"
                                        value={cvs.warehouse}
                                        onChange={(e) => e.target.value}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    {
                        csvJson.length > 0 &&
                        <button className="btn-primary btn-block mt-2" type="submit">Submit Intakes</button>
                    }
                </form>

            </main>

        </div>
    )
}
