import React, { useState, useEffect } from 'react'
import qcareApi from '../../api/qcareApi'
import { CardPreReport } from '../CardPreReport'
import { Pagination } from '../ui/Pagination'
import { Spinner } from '../ui/Spinner'

export const PreReports = () => {


    const [prereports, setPreReports] = useState([])
    // const [removed, setRemoved] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    const [loo, setLoo] = useState(false)


    useEffect(() => {
        async function fetchData() {

            setLoo(true)
            setPreReports([])

            const { data } = await qcareApi.get(`/prereport?page=${page}`)

            const prereports = data.prereports.map(pre => {
                return {
                    id: pre._id,
                    palletRef: pre.mainData.pallet_ref || "--",
                    mainData: pre.mainData,
                    pallets: pre.pallets,
                    fruit: pre.fruit,
                    score: pre.score,
                    startDate: pre.startDate,
                    endDate: pre.endDate,
                    grade: pre.grade,
                    action: pre.action
                }
            })

            setPreReports(prereports)
            setTotalPages(data.totalPages)
            setLoo(false)

        }

        fetchData()

    }, [page])


    // const handleRemove = async (currentId) => {

    //     if(currentId === null) return

    //     setLoo(true)

    //     try {

    //         await qcareApi.get(`/report/delete/${currentId}`);
    //         setRemoved(!removed)
    //         setOpenConfirmation(false)
    //         setLoo(false)

    //     } catch (error) {
    //         console.log(error)
    //         setOpenConfirmation(false)
    //         setLoo(false)
    //     }
    // }


    return (
        <div className="reports content">

            <main className="container">

                {
                    loo && <Spinner motive="loading" />
                }

                {/* {
                    openConfirmation &&
                    <ModalConfirmation
                        msg="Are you sure you want to remove this Report?"
                        closeConfirmation={setOpenConfirmation}
                        action={() => handleRemove(currentId)}
                    />
                } */}

                <div className="reports__title mb-2">
                    <h2 className="main-title">Pre Reports</h2>
                </div>


                {
                    prereports.length === 0
                        ? <p className="text-center">No Pre Reports</p>
                        :
                        <div>
                            <div className="reports__list">
                                {
                                    prereports.map(prereport => (
                                        <CardPreReport
                                            key={prereport.id}
                                            {...prereport}
                                        />
                                    ))
                                }
                            </div>

                            {
                                totalPages > 1 &&
                                <Pagination
                                    totalPages={totalPages}
                                    page={page}
                                    setPage={setPage}
                                />
                            }
                        </div>


                }

            </main>

        </div>
    );
}
