import React, { useRef } from 'react'
import { useState } from 'react'

export const ScoreItem = ({ pallet, grower, boxes }) => {

    const [newGrower, setNewGrower] = useState(grower)
    const [newBoxes, setNewBoxes] = useState(boxes)

    const boxesRef = useRef()

    const handleChange = (e, item) => {
        if (item === "grower") {
            setNewGrower(e.target.value)
            pallet.newGrower.grower_variety = e.target.value
        } else {
            setNewBoxes(e.target.value)
            pallet.newGrower.boxes = e.target.value
        }
    }


    return (
        <div className='score-grid my-1'>
            <input
                type='text'
                placeholder='Grower name'
                value={newGrower}
                onChange={(e) => handleChange(e, "grower")}
            />
            <input
                type='number'
                ref={boxesRef}
                value={newBoxes}
                onChange={(e) => handleChange(e, "boxes")}
                onClick={() => boxesRef.current.select()}
            />
        </div>
    )
}
