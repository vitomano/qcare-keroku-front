import React from 'react'

export const Spinner = ({motive="Loading"}) => {
    return (
        <div className="spinner">
            <div className="spinner__container">
                <p>{motive}</p>
                <svg viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
            </div>
        </div>
    )
}
