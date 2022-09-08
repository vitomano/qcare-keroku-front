import React, { useEffect, useState } from 'react'
import qcareApi from '../../api/qcareApi';
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import useMediaQuery from '../../hooks/useMediaQuery'
import { Charging } from '../ui/Charging'
import { ReportMain } from './ReportData/ReportMain'
import { ModalSelectPDF } from '../ui/ModalSelectPDF';
import { AccordeonPreReport } from '../ui/AccordeonPreReport';
import { duration } from '../../helpers/dateFormat';


export const SinglePreReport = () => {

    const [pallets, setPallets] = useState([])
    const [mainData, setMainData] = useState({})
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [updateVal, setUpdateVal] = useState(false)


    const [openPDFModal, setOpenPDFModal] = useState(false)

    const { id } = useParams()

    useEffect(() => {

        async function fetchData() {

            const { data } = await qcareApi.get(`/prereport/${id}`)

            setPallets(data.singlePreReport.pallets)
            setMainData(data.singlePreReport.mainData)
            setStartDate(data.singlePreReport.startDate)
            setEndDate(data.singlePreReport.endDate)

        }
        fetchData()
    }, [id, updateVal])

    return (

        <div className="content">

            <main className="container">
                {
                    (openPDFModal && pallets.length > 0) &&
                    <ModalSelectPDF
                        pallets={pallets.map(pall => ({ pid: pall.pid, images: pall.images }))}
                        setOpenPDFModal={setOpenPDFModal}
                        updateVal={updateVal}
                        setUpdateVal={setUpdateVal}
                        toast={toast}
                        reportId={id}
                    />
                }
                {
                    (pallets.length === 0)
                        ? <Charging />
                        : <div>

                            <div className="report">

                                <div className="report-title">
                                    <div className="report__details mb-2 span-6">
                                        <h2>{mainData.pallet_ref}</h2>
                                        <div className='flex my-02'>
                                            <p className='font-small'>Duration:</p>
                                            <p className='duration font-small'>{duration(startDate, endDate)} min</p>
                                        </div>
                                        {
                                            (endDate) &&
                                            <small className="text-muted">{new Date(endDate).toLocaleDateString()}  |  {new Date(endDate).getHours() + ":" + new Date(endDate).getMinutes()}</small>
                                        }



                                    </div>

                                </div>

                            </div>

                            <ReportMain
                                mainData={mainData}
                            />


                            {
                                pallets.length > 0

                                    ?
                                    <div className="pallets-container">
                                        {
                                            pallets.map((pallet, i) => {

                                                const labels = pallet.details.labels || []
                                                const appareance = pallet.details.appareance || []

                                                return (
                                                    <AccordeonPreReport
                                                        key={pallet.pid}
                                                        pallet={pallet}
                                                        labels={labels}
                                                        appareance={appareance}
                                                        i={i}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                    : <p>No Pallets</p>
                            }


                            <div className='btn-center mt-2'>
                                <Link
                                className='btn-exports share-blue m-auto text-center'
                                to={`/new-report/${id}`}
                                >
                                    <p>Finish Report <span className='ml-05 font-large'>&#8250;</span></p>
                                </Link>
                            </div>

                        </div>
                }

            </main>
        </div>
    );
}
