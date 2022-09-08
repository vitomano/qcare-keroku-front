import React, { useState } from 'react'

export const Range = ({ minVal, maxVal, label, disable=false }) => {

    const [rangeVal, setRangeVal] = useState(minVal)

    const sliderValueChanged = (e) => {
        setRangeVal(e.target.value)
    }

    return (
        <div className="grid my-2 range">
            <label className="span-5 range__label">{label}</label>
            <div className="span-7 range__div">
                <span className="range__left">{minVal}</span>
                <input
                    type="range"
                    value={rangeVal}
                    min={minVal}
                    max={maxVal}
                    step="2"
                    name={(label.replace(/ /g, "")).toLowerCase()}
                    onChange={sliderValueChanged}
                    disabled={disable}
                />
                <span className="range__right">{maxVal}</span>
            </div>
        </div>
    )
}
