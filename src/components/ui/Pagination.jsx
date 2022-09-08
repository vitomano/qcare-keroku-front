import React from 'react'
import {PagButton} from '../ui/PagButton'

export const Pagination = ({totalPages, page, setPage}) => {

    const allPages = new Array(totalPages).fill(null).map((n, i) => i + 1)
    const excede = [1, 2, 3, 4, 5, " ", totalPages]


    const previousBtn = () => {
        if (page > 1)
            setPage(page - 1)
    };

    const nextBtn = () => {
        if (page < totalPages)
            setPage(page + 1)
    };

    return (
        <div className="pagination">
            <div className="pagination__container">
                <button
                    className="pag-btn pag-g"
                    onClick={previousBtn}
                >
                    <p>←</p>
                </button>
                {
                    (totalPages <= 6)
                        ? allPages.map((number, index) => (
                            <PagButton
                                key={index}
                                num={number}
                                page={page}
                                setPage={setPage}
                            />
                        ))

                        :
                        page < 5

                            ? excede.splice(0, 7).map((number, index) => (
                                <PagButton
                                    key={index}
                                    num={number}
                                    page={page}
                                    setPage={setPage}
                                />
                            ))
                            : <>
                                <button
                                    className="pag-btn pag-w"
                                    onClick={() => setPage(1)}
                                >
                                    <p>1</p>
                                </button>
                                <p className='symbols'>&#8249;</p>
                                {
                                    allPages.splice(page - 3, 5).map((number, index) => (
                                        <PagButton
                                            key={index}
                                            num={number}
                                            page={page}
                                            setPage={setPage}
                                        />
                                    ))
                                }
                                {
                                    page < totalPages - 2 &&
                                    <>
                                        <p className='symbols'>&#8250;</p>
                                        <button
                                            className="pag-btn pag-w"
                                            onClick={() => setPage(totalPages)}
                                        >
                                            <p>{totalPages}</p>
                                        </button>
                                    </>
                                }

                            </>

                }
                {

                }
                <button
                    className="pag-btn pag-g"
                    onClick={nextBtn}
                >
                    <p>→</p>
                </button>

            </div>
        </div>
    )
}
