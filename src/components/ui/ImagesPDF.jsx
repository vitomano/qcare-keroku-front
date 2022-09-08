import React from 'react'
import { useState } from 'react'

export const ImagesPDF = ({ imgURL_low, imgURL, key_low, imagenes, setImages, pid }) => {


    const [checkRef, setCheckRef] = useState(true)

    const addImage = (url) => {
        
        setCheckRef(!checkRef)

        const elPallet = imagenes.find( pall => pall.pid === pid )
        const elResto = imagenes.filter( pall => pall.pid !== pid )
        
        if(!checkRef){

            elPallet.images.push({imgURL: url})
            setImages([...elResto, elPallet])

        } else {
            const newP = elPallet.images.filter( im => im.imgURL !== url)
            elPallet.images = newP
            setImages([...elResto, elPallet])
        }
    };

    
    return (

        <label className="modalPDF">
            <input
                type="checkbox"
                checked={checkRef}
                onChange={() => addImage(imgURL)}
            />
            <div className="modalPDF__container">
                <img
                    className={`${checkRef ? null : "img-trans"}`}
                    src={imgURL_low}
                    alt={key_low}
                />
                <span className={`box-checked ${checkRef ? "check-on" : "check-off"}`}>
                    {
                        checkRef &&
                        <img 
                        src='/assets/img/check.svg'
                        alt='check-icon'
                    />}
                </span>
            </div>
        </label>

    )
}
