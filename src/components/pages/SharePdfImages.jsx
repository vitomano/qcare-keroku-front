import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DocuPdf } from '../ui/DocuPdf'
import useMediaQuery from '../../hooks/useMediaQuery'


import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import qcareApi from '../../api/qcareApi'


export const SharePdfImages = () => {

    const [allData, setAllData] = useState(null)
    const matches = useMediaQuery("(min-width: 768px)");


    const { id } = useParams()

    useEffect(() => {

        async function fetchData() {

            await qcareApi.get(`/pdf/get-pdf/${id}`)

                .then(async (res) => {

                    const id = res.data.pdfData.reportId

                    const { data } = await qcareApi.get(`/report/share-report/${id}`)
                    
                    const finalData = data.singleReport
                    const pdf = res.data.pdfData.pdfImages
                    const palletes = data.singleReport.pallets

                    // ----------------- MIX ----------------- //

                    // const ress = palletes.map(obj =>  pdf.find(o => o.id === obj.id) || obj);

                    for(const palo of palletes){

                        const pido = palo.pid
                        const pdff = pdf.find( g => g.pid === pido)

                        palo.images = pdff.images
                    }

                    finalData.pallets = palletes

                    // ----------------- MIX ----------------- //

                    setAllData([finalData, false])


                })

        }
        fetchData()

    }, [id])

    return (

        <>

            {
                (allData !== null && matches) &&

                <div className="pdf-container">
                    <PDFDownloadLink
                        document={<DocuPdf allData={allData} />}
                        fileName={`${allData[0].mainData.pallet_ref || "report"}.pdf`}
                    >
                        <button className="btn-exports red-pdf">
                            <div className="flex" >
                                <img src="/assets/img/pdf-icon.svg" alt="pdf-data" />
                                <p>Download PDF</p>
                            </div>
                        </button>
                    </PDFDownloadLink>
                </div>
            }

            {
                (allData) &&
                <PDFViewer style={{ minWidth: "100%", height: "100vh" }}>
                    <DocuPdf allData={allData} />
                </PDFViewer>

            }

        </>

    );
}
