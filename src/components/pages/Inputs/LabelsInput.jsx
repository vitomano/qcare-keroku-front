import React, { useState } from 'react'

// export const Range = ({ id, label, name, minVal,maxVal, value}) => {
export const LabelsInput = ({ id, label, tipe, name, minVal, maxVal, valor, check, pallet }) => {

    const [valRef, setValRef] = useState(valor)
    const [checkRef, setCheckRef] = useState(check)

    const handleChange = (e) => {
        if (tipe === "range" || tipe === "number" || tipe === "text") {
            setValRef(e.target.value)
            pallet.labels[id].valor = e.target.value
        } else if (tipe === "checkbox") {
            setValRef(e.target.checked)
            pallet.labels[id].valor = !valRef
        }
    }

    const handleSelect = (e) => {
        setValRef(e.target.value)
        pallet.labels[id].valor = e.target.value
    }

    const handleCheck = (e) => {
        setCheckRef(e.target.checked)
        pallet.labels[id].check = e.target.checked
    }

    return (
        <div className="input-pallet">

            <div className="label-name">
                <input
                    className='check-on-off'
                    type="checkbox"
                    checked={checkRef}
                    onChange={handleCheck}
                />
                <label>{label}</label>
            </div>


            <div className="input-type">
                {
                    tipe === "checkbox" &&
                    <div className="input-range">
                        <label className="switch">
                            <input
                                type={tipe}
                                checked={valRef}
                                name={name}
                                onChange={handleChange}
                            />
                            <span className="slider"></span>
                        </label>
                        <span className="span-checkbox">
                            {valRef ? "Yes" : "No"}
                        </span>

                    </div>
                }
                {
                    tipe === "text" &&
                    <input
                        type={tipe}
                        value={valRef}
                        name={name}
                        onChange={handleChange}
                    />
                }
                {
                    tipe === "select" &&

                    <div className="score-wraper">
                        <select onChange={handleSelect} value={valRef} className="full">
                            <option value="0">NO</option>
                            <option value="1">1/5</option>
                            <option value="2">2/5</option>
                            <option value="3">3/5</option>
                            <option value="4">4/5</option>
                            <option value="5">5/5</option>

                        </select>
                    </div>
                }
                {
                    tipe === "range" &&
                    <div className="input-range">
                        <input
                            type={tipe}
                            value={valRef}
                            min={minVal}
                            max={maxVal}
                            step="1"
                            name={name}
                            onChange={handleChange}
                        />
                        <span className="span-range">{valRef}</span>
                    </div>
                }
                {
                    tipe === "number" &&
                    <input
                        type={tipe}
                        value={valRef}
                        name={name}
                        onChange={handleChange}
                    />
                }
            </div>
        </div>
    )
}
