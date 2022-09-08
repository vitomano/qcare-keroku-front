import React, { useState } from 'react'


export const Input = ({parametro, valor}) => {

    const [value, setValor] = useState(valor)


    return (
        <>
            <label className="span-5">{parametro}</label>
            <input
                className="span-7"
                type="text"
                name={parametro}
                value={value}
                onChange={e => setValor(e.target.value)}
            />
        </>
    )
}
