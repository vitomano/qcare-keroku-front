import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import qcareApi from '../../api/qcareApi'


export const ModalLifeImage = ({ setOpenModalFile, lifeId, dayId, reloaded }) => {

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

        if (!lifeId) return

        if (selectedImage.length === 0) {
            toast.error('Select at least 1 file')
            return
        }

        setLoo(true)

        try {

            const formData = new FormData();

            for (const img of selectedImage) {
                formData.append('multerLife', img)
            }

            formData.append('lifeId', lifeId)
            formData.append('dayId', dayId)

            await qcareApi.put('/life-test/add-life-images', formData)

            setLoo(false)
            closeModal()
            toast.success(`${selectedImage.length} files added`)
            reloaded()

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

                            <img src="/assets/img/upload-life.svg" alt="img-icon" />


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
