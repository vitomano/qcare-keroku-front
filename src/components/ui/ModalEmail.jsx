import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import qcareApi from '../../api/qcareApi'
// import { keyName, reverseStr } from '../../helpers/imageKey'
import { ImagesPDF } from './ImagesPDF'


const baseURL = process.env.REACT_APP_API_URL

export const ModalEmail = ({
    pallets,
    setOpenPDFModal,
    reportId,
    label,
    toast,
    // currentVal,
    // updateVal,
    // setUpdateVal
}) => {

    useEffect(() => {
        let allImages = []
        for (const paly of pallets) {
            allImages.push({
                pid: paly.pid,
                images: paly.images.map(imOne => { return { imgURL: imOne.imgURL } })
            })
        }

        setImages(allImages)
    }, [pallets])


    const [images, setImages] = useState([])

    const [link, setLink] = useState(null)

    const closeModal = () => {
        setOpenPDFModal(false)
    }

    const createLink = async () => {

        const { data } = await qcareApi.post('/pdf/create-pdf', {
            reportId,
            pdfImages: images
        })

        setLink(`https://q-care.info/share-report-qc/${data.pdfId}`)
    };


    return (
        <div className="modal">

            <div className="modal__cardPDF">
                <div>
                    <label className="modal-label mb-2">{label}</label>


                    {
                        link === null
                            ?
                            pallets.map((onePall, i) => (
                                <div key={onePall.pid}>
                                    <p className="mb-05 font-medium color-primary">Pallet {i + 1}</p>
                                    <div className="modal-images mb-2">
                                        {
                                            onePall.images.map(img => (
                                                <ImagesPDF
                                                    key={img.key}
                                                    pid={onePall.pid}
                                                    imagenes={images}
                                                    setImages={setImages}
                                                    {...img}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                            :
                            <CopyToClipboard text={link}>
                                <button onClick={() => { toast.success('copied to clipboard') }} className="btn-exports share-white">
                                    <div className="flex" >
                                        <p>{link}</p>
                                    </div>
                                </button>
                            </CopyToClipboard>
                    }


                    <div className="modal__botones mt-2">

                        <button onClick={closeModal} className="btn-exports red-pdf">
                            <div className="flex" >
                                <p>Close</p>
                            </div>
                        </button>



                        {
                        link === null &&
                            <button onClick={createLink} className="btn-exports share-white ml-1">
                            <div className="flex" >
                                <img src="/assets/img/share-link.svg" alt="pdf-data" />
                                <p>Create PDF Link</p>
                            </div>
                        </button>
                        }

                    </div>
                </div>
            </div>



        </div>
    )
}