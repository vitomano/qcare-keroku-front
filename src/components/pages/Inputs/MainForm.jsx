import React from 'react'
import { formatSplit, totalKilos } from '../../../helpers/formatSplit'
import useForm from '../../../hooks/useForm'
import { blockInvalidChar } from '../../../helpers/eliminarEs'


export const MainForm = ({ intakes, pallets, defaultProduct, finalSamples }) => {

    const [inputVal, handleInputChange, handleEmpty] = useForm({
        pallet_ref: intakes?.pallet_ref || "",
        delivery_note: intakes.delivery_note || "",
        format: intakes.format || "",
        gln_ggn: intakes.gln_ggn || "",
        origin: intakes.origin || "",
        product: intakes.product || defaultProduct || "",
        purchase_order: intakes.purchase_order || "",
        quality: intakes.quality || "",
        supplier: intakes.supplier || "",
        grower: intakes.grower || "",
        total_boxes: intakes.total_boxes || "",
        transport: intakes.transport || "",
        variety: intakes.variety || "",
        unit_label: intakes.unit_label || "",
        warehouse: intakes.warehouse || "",
        kilos: totalKilos(intakes.format, intakes.total_boxes) || "0",
        samples: Number(finalSamples) || 1,
        format_gr: formatSplit(intakes?.format) || "0",

    })

    const {
        pallet_ref,
        delivery_note,
        format,
        gln_ggn,
        origin,
        product,
        purchase_order,
        quality,
        supplier,
        grower,
        total_boxes,
        transport,
        variety,
        unit_label,
        warehouse,
        kilos,
        samples,
        format_gr
    } = inputVal



    return (
        <form id="main-form">
            <div className="grid intake__input">
                <label className="span-5 ">Pallet-Ref</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="pallet_ref"
                    value={pallet_ref}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Product</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="product"
                    value={product}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Format</label>

                <input
                    className="span-7 d-input"
                    placeholder='e.g. 12*125g'
                    type="text"
                    name="format"
                    value={format}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Supplier</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="supplier"
                    value={supplier}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Grower</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="grower"
                    value={grower}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Origin</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="origin"
                    value={origin}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">GLN/GGN</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="gln_ggn"
                    value={gln_ggn}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Variety(ies)</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="variety"
                    value={variety}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Unit Label</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="unit_label"
                    value={unit_label}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Total Boxes</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="total_boxes"
                    value={total_boxes}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Total Pallets</label>

                <input
                    disabled
                    className="span-7 d-input"
                    type="text"
                    name="total_pallets"
                    value={pallets.length}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Quality</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="quality"
                    value={quality}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Transport</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="transport"
                    value={transport}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Purchase Order</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="purchase_order"
                    value={purchase_order}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Delivery Note / AWB Number</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="delivery_note"
                    value={delivery_note}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Warehouse</label>

                <input
                    className="span-7 d-input"
                    type="text"
                    name="warehouse"
                    value={warehouse}
                    onChange={handleInputChange}
                />
            </div>
            <div className="grid intake__input">
                <label className="span-5 ">Samples</label>

                <input
                    disabled
                    className="span-7 d-input"
                    type="number"
                    min={1}
                    max={40}
                    name="samples"
                    value={samples}
                    onChange={handleInputChange}

                    onKeyDown={blockInvalidChar}
                    onBlur={handleEmpty}
            
                />
            </div>

            <div className="grid intake__input">
                <label className="span-5 ">Kilos</label>

                <div className="span-7 d-input">
                    <input
                        id='kilos'
                        className="d-input"
                        type="number"
                        name="kilos"
                        placeholder="e.g. 12"
                        value={kilos}
                        onChange={handleInputChange}
                    />
                    <p className="mx-1">kg</p>
                </div>

            </div>


            <div className="grid intake__input">
                <label className="span-5 ">Format gr</label>

                <div className="span-7 d-input">
                    <input
                        id='formatGr'
                        className="d-input"
                        type="number"
                        name="format_gr"
                        placeholder="e.g. 250"
                        value={format_gr}
                        onChange={handleInputChange}
                    />
                    <p className="mx-1">gr.</p>
                </div>

            </div>


        </form>
    )
}
