import React, { useState } from 'react'
import { Arrays } from './Arrays'

// export const Range = ({ id, label, name, minVal,maxVal, value}) => {
export const AppareanceInput = ({ id, label, tipe, name, minVal, maxVal, valor, check, pallet, arrays }) => {


    const [valRef, setValRef] = useState(valor)
    const [checkRef, setCheckRef] = useState(check)


    const handleChange = (e) => {
        if (tipe === "range") {
            setValRef(e.target.value)
            pallet.appareance[id].valor = e.target.value
        } else if (tipe === "checkbox") {
            setValRef(e.target.checked)
            pallet.appareance[id].valor = e.target.checked
        } else if (tipe === "text") {
            setValRef(e.target.value)
            pallet.appareance[id].valor = e.target.value
        } else if (tipe === "number") {
            setValRef(e.target.value)
            pallet.appareance[id].valor = e.target.value
        }
    }

    const handleCheck = (e) => {
        setCheckRef(e.target.checked)
        pallet.appareance[id].check = e.target.checked
    }


    return (
        <div className="input-pallet">

            {/* <div className="label-name"> */}
            <div className={`${tipe !== "arrays" ? "label-name" : "label-name-up"}`}>
                <input
                    type="checkbox"
                    className='check-on-off'
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

                {
                    arrays &&
                    <div className="grid--space">
                        {
                            valor.map((oneVal, p) => (

                                <Arrays
                                    key={p}
                                    val={oneVal}
                                    pallet={pallet}
                                    id={id}
                                    aid={p}
                                // handleChange={handleChange}
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
