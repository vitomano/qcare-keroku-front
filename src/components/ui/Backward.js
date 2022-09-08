import React from 'react';

export const Backward = ({history, pPath}) => {


    const handleBack = () => {
        (pPath)
        ? history.push(pPath)
        : history.push('/')
    }
    

    return (
        <button onClick={handleBack} className="new">
            <svg version="1.1" viewBox="0 0 200 200">
                <polygon points="140.8,27.1 129.7,16 45.7,100 45.7,100 45.7,100 129.7,184 140.8,172.9 67.9,100 " />
            </svg>
        </button>
    )
}
