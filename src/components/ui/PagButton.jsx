import React from 'react'

export const PagButton = ({ num = 1, page, setPage }) => {

    return (
        <>
            {
                num === " "
                    ? <p className='symbols'>&#8250;</p>
                    : <button
                        className={`pag-btn ${(num === page) ? "pag-hl" : "pag-w"}`}
                        onClick={() => setPage(num)}
                    >
                        <p>{num}</p>
                    </button>
            }
        </>
    )
}
