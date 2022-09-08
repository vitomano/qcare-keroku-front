import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import qcareApi from '../../api/qcareApi'
// import { keyName, reverseStr } from '../../helpers/imageKey'
import { ImagesPDF } from './ImagesPDF'
import { MailForm } from './MailForm'


export const ModalSelectPDF = ({
    pallets,
    setOpenPDFModal,
    reportId,
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
    const [mail, setMail] = useState(null)
    const [cargando, setCargando] = useState(false)


    const [mailTo, setMailTo] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const [tags, setTags] = useState([]);


    const closeModal = () => {
        setOpenPDFModal(false)
    }


    //Save the PDF Data in the Database
    const createLink = async () => {

        const { data } = await qcareApi.post('/pdf/create-pdf', {
            reportId,
            pdfImages: images
        })

        setLink(`https://q-care.info/share-report-qc/${data.pdfId}`)
    };


    //Send the PDF by mail
    const sendMail = async () => {

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexp.test(mailTo)) { return toast.error('Invalid Email') }
        if (subject.length < 1) { return toast.error('Add a Subject') }
        if (message.length < 1) { return toast.error('Add a Message') }
        
        setCargando(true)

        try {

            await qcareApi.post('/pdf/send-mail', {
                mailTo,
                subject,
                message,
                cc: tags.length > 0 ? tags.join(", ") : "",
                link
            })

            
            toast.success('Email delivered')
            setOpenPDFModal(false)
            setCargando(false)

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setCargando(false)
        }
    };

    return (
        <div className="modal">

            <div className="modal__cardPDF">

                    {
                        link === null
                            ?
                            pallets.map((onePall, i) => (
                                <div key={onePall.pid}>
                                    <p className="mb-05 font-medium color-primary">Pallet {i + 1}</p>
                                    <div className="modal-images mb-2">
                                        {
                                            onePall.images.length > 0
                                            ? 
                                            onePall.images.map(img => (
                                                <ImagesPDF
                                                    key={img.key}
                                                    pid={onePall.pid}
                                                    imagenes={images}
                                                    setImages={setImages}
                                                    {...img}
                                                />
                                            ))
                                            : <p>No images</p>
                                        }
                                    </div>
                                </div>
                            ))
                            :

                            mail === null
                                ? <div>
                                    <p className="text-clear font-small text-center mb-1">Click the address to copy to clipboard</p>
                                    <CopyToClipboard text={link}>
                                        <button onClick={() => { toast.success('copied to clipboard') }} className="btn-exports share-white">
                                            <div className="flex" >
                                                <p>{link}</p>
                                            </div>
                                        </button>
                                    </CopyToClipboard>
                                </div>
                                : <MailForm
                                    mailTo={mailTo}
                                    setMailTo={setMailTo}
                                    subject={subject}
                                    setSubject={setSubject}
                                    message={message}
                                    setMessage={setMessage}

                                    tags={tags}
                                    setTags={setTags}
                                    toast={toast}
                                />

                    }


                    {cargando

                        ?
                        <div className="modal__botones mt-2">
                            <p className="text-center">Sending...</p>
                        </div>


                        :
                        <div className="modal__botones mt-2">

                            <button onClick={closeModal} className="btn-exports red-pdf">
                                <div className="flex" >
                                    <p>Close</p>
                                </div>
                            </button>

                            {
                                link !== null && mail === null &&

                                <button onClick={() => {
                                    setMail(false)
                                    setMessage(`See the report in this link:

${link}`
                                    )

                                }} className="btn-exports share-blue ml-1">
                                    <div className="flex" >
                                        <img src="/assets/img/email-icon.svg" alt="pdf-data" />
                                        <p>Send it by Mail</p>
                                    </div>
                                </button>
                            }

                            {
                                link !== null && mail !== null &&

                                <button onClick={sendMail} className="btn-exports share-blue ml-1">
                                    <div className="flex" >
                                        <img src="/assets/img/send-icon.svg" alt="pdf-data" />
                                        <p>Send</p>
                                    </div>
                                </button>
                            }



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
                    }
            </div>
        </div>
    )
}