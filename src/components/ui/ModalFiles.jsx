import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import qcareApi from '../../api/qcareApi'


export const ModalFiles = ({ setOpenModalFile, pid, reportId, updateVal, setUpdateVal }) => {

    const [selectedImage, setSelectedImage] = useState([])

    const [loo, setLoo] = useState(false)

    const handleImages = (e) => {
        setSelectedImage(e.target.files)
    }

    const closeModal = () => {
        setSelectedImage([])
        setOpenModalFile(false)
    }

    const sendImages = async () => {

        if (!pid) return

        if (selectedImage.length === 0) {
            toast.error('Select at least 1 file')
            return
        }

        const token = localStorage.getItem('token')

        if (!token) {
            return
        }

        setLoo(true)

        try {

            const formData = new FormData();

            for (const img of selectedImage) {
                formData.append('uploady', img)
            }

            formData.append('rid', reportId)
            formData.append('palletId', pid)

            await qcareApi.post('/report/add-files', formData)

            setLoo(false)
            closeModal()
            toast.success(`${selectedImage.length} files added`)
            setUpdateVal(!updateVal)

        } catch (error) {
            setLoo(false)
            console.log(error)
            toast.error('Something went wrong')
        }

    }

    return (
        <div className="modal">

            <div className="modal__card">

                {
                    loo
                        ?
                        <div>
                            <div className="loading">Loading&#8230;</div>
                            <p style={{ marginTop: "70px" }}>Uploading</p>
                        </div>

                        :
                        <div className="modal__content">

                            <label htmlFor="newFiles" className="upload-label mb-1 mt-2">

                                <svg viewBox="0 0 6.6 6.6">
                                    <g>
                                        <path d="M5.6,0.6C5.6,0.6,5.6,0.6,5.6,0.6c-0.1,0-0.2,0.1-0.2,0.2v0.6H4.9c0,0,0,0,0,0c-0.1,0-0.2,0.1-0.2,0.2
c0,0.1,0.1,0.2,0.2,0.2h0.6v0.6c0,0.1,0.1,0.2,0.2,0.2c0.1,0,0.2-0.1,0.2-0.2c0,0,0,0,0,0V1.8h0.6c0.1,0,0.2-0.1,0.2-0.2
c0-0.1-0.1-0.2-0.2-0.2c0,0,0,0,0,0H5.8V0.8C5.8,0.7,5.7,0.6,5.6,0.6C5.6,0.6,5.6,0.6,5.6,0.6L5.6,0.6z M4.5,0.6
C4.5,0.6,4.5,0.6,4.5,0.6l-0.9,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.2,0-0.4,0-0.5,0c-0.2,0-0.3,0.1-0.4,0.2c0,0,0,0,0,0
C1.9,1,1.8,1.1,1.7,1.2C1.6,1.3,1.5,1.4,1.5,1.4H0.8C0.4,1.4,0,1.7,0,2.1v3.1C0,5.7,0.4,6,0.8,6h2.5h2.5c0.4,0,0.8-0.4,0.8-0.8V2.5
c0-0.1-0.1-0.2-0.2-0.2c-0.1,0-0.2,0.1-0.2,0.2c0,0,0,0,0,0v2.8c0,0.2-0.2,0.4-0.4,0.4H3.3H0.8c-0.2,0-0.4-0.2-0.4-0.4V2.1
c0-0.2,0.2-0.4,0.4-0.4h0.7c0.2,0,0.3-0.1,0.5-0.2c0.1-0.1,0.2-0.3,0.3-0.4C2.4,1.1,2.5,1,2.6,1C2.7,1,2.8,1,3,1c0.1,0,0.2,0,0.3,0
c0.1,0,0.2,0,0.2,0c0,0,0.9,0,0.9,0c0.1,0,0.2-0.1,0.2-0.2C4.7,0.7,4.6,0.6,4.5,0.6C4.5,0.6,4.5,0.6,4.5,0.6L4.5,0.6z M3.3,2.5
c-0.5,0-1,0.4-1,1s0.4,1,1,1c0.5,0,1-0.4,1-1S3.8,2.5,3.3,2.5z M3.3,2.9c0.3,0,0.6,0.3,0.6,0.6S3.6,4.1,3.3,4.1
C3,4.1,2.7,3.8,2.7,3.5C2.7,3.2,3,2.9,3.3,2.9z"/>
                                    </g>
                                </svg>

                                <span>Choose Images</span>
                            </label>
                            <input
                                id="newFiles"
                                className="upload-btn"
                                accept=".jpg, .png, .jpeg"
                                multiple
                                name="file"
                                type="file"
                                onChange={handleImages}
                            />
                            <div className="mb-1 w-100 text-center">
                                {
                                    selectedImage.length > 0 &&
                                    <span>{selectedImage.length} file/s selected</span>
                                }
                            </div>


                            <div className="modal__botones">
                                <button
                                    className="modal-btn btn-close mr-05"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="modal-btn btn-add ml-05"
                                    onClick={sendImages}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                }




            </div>



        </div>
    )
}
