import React, { useState } from 'react'
import { useRef } from 'react'
import { blockInvalidChar } from '../../../helpers/eliminarEs'


export const Arrays = ({ val, id, pallet, aid, details="appareance" }) => {

    const [valArr, setValArr] = useState(val)

    const inputRef = useRef()

    const handleChangeArray = (e) => {

        if(details === "appareance"){
            setValArr(e.target.value)
            pallet.appareance[id].valor[aid] = e.target.value
        }
        else if(details === "labels"){
            setValArr(e.target.value)
            pallet.labels[id].valor[aid] = e.target.value
        }
        else{
            setValArr(e.target.value)
            pallet.pallgrow[id].valor[aid] = e.target.value
        }
    }

    const handleSelect = () => {
        const input = inputRef.current
        input.select()
    }

    const handleNo = (e) => {
        if (e.target.value === '') {
            setValArr("0")
            pallet[details][id].valor[aid] = "0"
        }
    }

    return (
        <>
            {
                <input
                    className={`${details === "pallgrow" ?"span-horizontal mr-05" :"span-6"}`}
                    type="number"
                    value={valArr}
                    onChange={handleChangeArray}

                    min="0"
                    ref={inputRef}
                    onClick={handleSelect}
                    onBlur={handleNo}
                    onKeyDown={blockInvalidChar}
                />
            }
        </>
    )
}
