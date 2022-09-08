import React, { useRef, useState } from 'react'
import { blockInvalidChar } from '../../../helpers/eliminarEs'
import { Arrays } from './Arrays'

export const Pallgrow = ({ id, label, tipe, name, minVal, maxVal, valor, check, pallet, addSample, restSample, sam }) => {

    const [valRef, setValRef] = useState(valor)
    const [checkRef, setCheckRef] = useState(check)

    const inputRef = useRef()

    const handleChange = (e) => {
        if (tipe === "range") {
            setValRef(e.target.value)
            pallet.pallgrow[id].valor = e.target.value
        } else if (tipe === "checkbox") {
            setValRef(e.target.checked)
            pallet.pallgrow[id].valor = e.target.checked
        } else if (tipe === "text") {
            setValRef(e.target.value)
            pallet.pallgrow[id].valor = e.target.value
        } else if (tipe === "number") {
            setValRef(e.target.value)
            pallet.pallgrow[id].valor = e.target.value
        }
    }

    const handleCheck = (e) => {
        setCheckRef(e.target.checked)
        pallet.pallgrow[id].check = e.target.checked
    }

    const handleSelect = () => {
        const input = inputRef.current
        input.select()
    }

    const handleNo = (e) => {
        if (e.target.value === '') {
            setValRef("0")
            pallet.pallgrow[id].valor = "0"
        }
    }

    return (
        <div className="input-pallet">

            <div className={`${tipe !== "arrays" ? "label-name-up" : "label-name"}`}>
                {
                    (name !== "weight_10") &&
                    <input
                        className='check-on-off'
                        type="checkbox"
                        checked={checkRef}
                        onChange={handleCheck}
                    />
                }
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
                <div className="input-range">
                    {
                        tipe === "number" &&
                        <input
                            type={tipe}
                            value={valRef}
                            name={name}
                            ref={inputRef}
                            min="0"
                            onKeyDown={blockInvalidChar}
                            onChange={handleChange}
                            onClick={handleSelect}
                            onBlur={handleNo}
                        />
                    }
                    {
                        (name === "weight_10") &&
                        <p className="mx-1">gr.</p>
                    }

                </div>

                <div className="input-range">
                    {
                        (tipe === "number") &&
                        <div className="flex samples-box">
                            <div className='flex-samples mt-1 pl-05'>
                                {
                                    new Array(Number(sam)).fill("0").map((v, index) => (
                                        <span key={index} className="span-horizontal mr-05 small-text">sample {index + 1}</span>
                                    ))
                                }
                            </div>
                            <div className="plus-box">
                                 <button
                                    className="plus-btn mr-05"
                                    onClick={restSample}
                                >-</button>

                                <button
                                    className="plus-btn mr-1"
                                    onClick={addSample}
                                >+</button>
                            </div>
                        </div>

                    }


                </div>


                {
                    tipe === "arrays" &&
                    <div className="flex">

                        {
                            valor.map((oneVal, p) => (
                                <Arrays
                                    key={p}
                                    val={oneVal}
                                    pallet={pallet}
                                    id={id}
                                    aid={p}
                                    details="pallgrow"
                                />
                            )
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}
