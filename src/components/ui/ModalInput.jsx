import React, { useRef } from 'react'
// import { blockInvalidChar } from '../../../helpers/eliminarEs'

export const ModalInput = ({ label, idVal, inpV, valRef, setValRef }) => {

    const inputRef = useRef()

    // const handleChange = (e) => {
    //     setNewVal(e.target.value)
    //     objeto.valor = e.target.value
    // }

    const handleChangeInp = (e) => {
        let newArray = [...valRef]
        newArray[idVal].valor = e.target.value;

        setValRef(newArray)
    };

    const handleSelect = () => {
        const input = inputRef.current
        input.select()
    }

    return(
        <input
            className="mb-1"
            type="number"
            value={inpV.valor}
            placeholder={label + " " + (idVal+1)}
            ref={inputRef}
            min="0"
            onChange={handleChangeInp}
            onClick={handleSelect}
        />
    )
}
