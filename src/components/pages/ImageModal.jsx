import React from 'react'
import toast from 'react-hot-toast';
import qcareApi from '../../api/qcareApi';


export const ImageModal = ({ setModel, model, handleNext, singleImage = null, setSingleImage, setIndice, handlePrev, pallImages, indice, pid, reportId, setUpdateVal, updateVal }) => {

    const deleteImage = async (img) => {

        const toRemove = pallImages.find(imag => imag.imgURL === img)

        if (toRemove) {

            try {

                await qcareApi.post(`/report/delete-image`, {
                    reportId,
                    palletId: pid,
                    keyName: toRemove.key,
                    keyLow: toRemove.key_low
                })


                setUpdateVal(!updateVal)
                setModel(false)
                toast.success("Image deleted")

            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")

            }

        } else {toast.error("Something went wrong")}

    };

    return (
        <div className={model ? "model open" : "model"}>

            <button
                onClick={() => deleteImage(singleImage)}
                className="delete-img mr-1">Delete</button>

            {
                singleImage !== null &&
                <img src={singleImage} alt="stageImg" />
            }

            <img
                className="svg-icon"
                src="/assets/img/close-icon.svg"
                alt="close-icon"
                onClick={() => {
                    setModel(false)
                    setSingleImage("")
                    setIndice(0)
                }}
            />

            <div className="next-prev">
                <img src="/assets/img/image-prev.svg" alt="imageprev" onClick={handlePrev} />
                <img src="/assets/img/image-next.svg" alt="imagenext" onClick={handleNext} />
            </div>

            <div className="index-float">
                <p>{indice + 1} / {pallImages.length}</p>
            </div>

        </div>
    )

}
