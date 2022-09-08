import React, { useEffect, useState } from 'react'
import qcareApi from '../../api/qcareApi';
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import useMediaQuery from '../../hooks/useMediaQuery'
import { Charging } from '../ui/Charging'
import { ExcelExport } from '../ui/ExcelExport'
import { ReportMain } from './ReportData/ReportMain'
import { ReportPallet } from './ReportData/ReportPallet'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ModalSelectPDF } from '../ui/ModalSelectPDF';
import { useOldDate } from '../../hooks/useOldDate';


export const Report = () => {

    const [pallets, setPallets] = useState([])
    const [mainData, setMainData] = useState({})
    const [date, setDate] = useState("")

    const [fruit, setFruit] = useState("other")
    const [comments, setComments] = useState("")
    const [format, setFormat] = useState(0)
    const [updateVal, setUpdateVal] = useState(false)
    const [allData, setAllData] = useState(null)


    const [openPDFModal, setOpenPDFModal] = useState(false)

    const matches = useMediaQuery("(min-width: 768px)");

    const { id } = useParams()
    const { oldDate } = useOldDate(date)

    useEffect(() => {

        async function fetchData() {

            const { data } = await qcareApi.get(`/report/${id}`)

            console.log(data.singleReport)

            setAllData(data.singleReport)
            setPallets(data.singleReport.pallets)
            setMainData(data.singleReport.mainData)
            setFormat(data.singleReport.mainData.format_gr || data.singleReport.formatGr || 0)
            setDate(data.singleReport.date)
            setFruit(data.singleReport.fruit || "other")
            setComments(data.singleReport.comments)
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
                                        {
                                            (date) &&
                                            <small className="text-muted">{new Date(date).toLocaleDateString()}  |  {new Date(date).getHours() + ":" + new Date(date).getMinutes()}</small>
                                        }
                                    </div>

                                </div>

                            </div>

                            <ReportMain
                                mainData={mainData}
                            />


                            {
                                pallets.length > 0 && date

                                    ? <ReportPallet
                                        oldDate={oldDate}
                                        pallets={pallets}
                                        format={parseInt(format)}
                                        reportId={id}
                                        updateVal={updateVal}
                                        setUpdateVal={setUpdateVal}
                                        fruit={fruit}
                                    />
                                    : <p>No Pallets</p>
                            }

                            <div className="my-2">
                                <h3 className='mb-1'>Comments</h3>
                                <p className='comments-report'>{comments}</p>
                            </div>
                        </div>
                }


                <div className="flex">
                    {/* {
                        matches &&
                        pallets.length > 0 &&

                        <button className="btn-exports green">
                            <ExcelExport
                                mainData={mainData}
                                pallets={pallets}
                            />
                        </button>
                    } */}
                    {
                        (allData) &&

                        <Link to={`/view-pdf/${id}`} target="_blank" className="btn-exports red-pdf ml-1">
                            <div className="flex" >
                                <img src="/assets/img/pdf-icon.svg" alt="pdf-data" />
                                <p>View PDF</p>
                            </div>
                        </Link>
                    }

                    {
                        (allData) && pallets.every(pall => pall.images.length === 0)

                            ? <CopyToClipboard text={`https://q-care.info/share-report/${id}`}>
                                <button onClick={() => { toast.success('copied to clipboard') }} className="btn-exports share-white ml-1">
                                    <div className="flex" >
                                        <img src="/assets/img/share-link.svg" alt="pdf-data" />
                                        <p>Share PDF</p>
                                    </div>
                                </button>
                            </CopyToClipboard>

                            : 
                            (allData) &&
                            <button
                                className="btn-exports share-white ml-1"
                                onClick={() => setOpenPDFModal(true)}
                            >
                                <div className="flex" >
                                    <img src="/assets/img/share-link.svg" alt="pdf-data" />
                                    <p>Share Link</p>
                                </div>
                            </button>
                    }

                </div>
            </main>
        </div>
    );
}
