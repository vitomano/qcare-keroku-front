import React from 'react'

export const ImageCarousel = (setOpenModalCarousel, data, index=0) => {


    // const handleNext = () => {
    //     setSingleImage("")
    //     if (indice < pallImages.length - 1) {
    //         setIndice(indice => indice + 1)
    //         setSingleImage(pallImages[indice + 1].imgURL || pallImages[indice + 1].imgURL_low)
    //     } else {
    //         setSingleImage(pallImages[0].imgURL || pallImages[0].imgURL_low)
    //         setIndice(0)
    //     }
    // }

    // const handlePrev = () => {
    //     setSingleImage("")
    //     if (indice > 0) {
    //         setIndice(indice => indice - 1)
    //         setSingleImage(pallImages[indice - 1].imgURL || pallImages[indice - 1].imgURL_low)
    //     } else {
    //         setIndice(pallImages.length - 1)
    //         setSingleImage(pallImages[pallImages.length - 1].imgURL || pallImages[pallImages.length - 1].imgURL_low)

    //     }
    // }

    console.log(index)

    return (

        <div className="modal">

                <button
                    // onClick={() => deleteImage(singleImage)}
                    className="delete-img mr-1">
                    Delete
                </button>

                {/* <img src={data[index]} alt="stageImg" /> */}
                

                <img
                    className="svg-icon"
                    src="/assets/img/close-icon.svg"
                    alt="close-icon"
                    // onClick={() => {
                    //     setModel(false)
                    //     setSingleImage("")
                    //     setIndice(0)
                    // }}
                />

                {/* <div className="next-prev">
                <img src="/assets/img/image-prev.svg" alt="imageprev" onClick={handlePrev} />
                <img src="/assets/img/image-next.svg" alt="imagenext" onClick={handleNext} />
            </div> */}

                <div className="index-float">
                    <p>{index + 1} / {data.length}</p>
                </div>

        </div>



    )
}
