import React, { useState } from 'react'

import { colorScore } from '../../helpers/colorScore'
import { itemValor, valorPallgrow } from '../../helpers/eliminarEs'
import { percentage } from '../../helpers/percentage'
import { ImageModal } from '../pages/ImageModal'
import { ModalEdit } from './ModalEdit'

import toast from 'react-hot-toast';
import { ModalEditScore } from './ModalEditScore'
import { ModalFiles } from './ModalFiles'
import { colorScoreOldReports } from '../../helpers/colorScoreOldReports'
import { colorGrade } from '../../helpers/colorGrade'
import { colorAction } from '../../helpers/colorAction'
import { GrowerTable } from './GrowerTable'


export const AccordeonPreReport = ({ pallet, i, labels, appareance }) => {


    const [model, setModel] = useState(false)
    const [singleImage, setSingleImage] = useState(null)

    const [pallImages, setPallImages] = useState([])
    const [indice, setIndice] = useState(0)

    const [activeAccordeon, setActiveAccordeon] = useState(true)



    /* Modal */
    const [openModal, setOpenModal] = useState(false)
    const [openModalScore, setOpenModalScore] = useState(false)
    const [openModalFile, setOpenModalFile] = useState(false)


    const imagesArray = (imgArr, u) => {
        setModel(true)
        setPallImages(imgArr)
        setSingleImage(imgArr[u].imgURL || imgArr[u].imgURL_low)
        setIndice(u)
    }

    const handleNext = () => {
        setSingleImage(null)
        if (indice < pallImages.length - 1) {
            setIndice(indice => indice + 1)
            setSingleImage(pallImages[indice + 1].imgURL || pallImages[indice + 1].imgURL_low)
        } else {
            setSingleImage(pallImages[0].imgURL || pallImages[0].imgURL_low)
            setIndice(0)
        }
    }

    const handlePrev = () => {
        setSingleImage(null)
        if (indice > 0) {
            setIndice(indice => indice - 1)
            setSingleImage(pallImages[indice - 1].imgURL || pallImages[indice - 1].imgURL_low)
        } else {
            setIndice(pallImages.length - 1)
            setSingleImage(pallImages[pallImages.length - 1].imgURL || pallImages[pallImages.length - 1].imgURL_low)

        }
    }

    // const activeModal = (tipo, pid, itemName, detailName, label, currentVal) => {

    //     setEditContent({
    //         reportId,
    //         pid,
    //         label,
    //         itemName,
    //         detailName,
    //         tipo,
    //         currentVal
    //     })

    //     setOpenModal(true)
    // };

    const activeModalScore = () => {
        setOpenModalScore(true)
    };


    return (
        <div className={`${activeAccordeon ? "accordeon show" : "accordeon"} card-accordeon p-1 mb-1`}>


            {/* {
                openModalFile &&
                <ModalFiles
                    setOpenModalFile={setOpenModalFile}
                    toast={toast}
                    pid={pid}
                    reportId={reportId}
                    updateVal={updateVal}
                    setUpdateVal={setUpdateVal}

                />
            }
            {
                openModal &&
                <ModalEdit
                    setOpenModal={setOpenModal}
                    updateVal={updateVal}
                    setUpdateVal={setUpdateVal}
                    toast={toast}
                    {...editContent}
                />
            }
            {
                openModalScore &&
                <ModalEditScore
                    setOpenModalScore={setOpenModalScore}
                    newScore={newScore}
                    setNewScore={setNewScore}
                    updateVal={updateVal}
                    setUpdateVal={setUpdateVal}
                    toast={toast}
                    score={score}
                    reportId={reportId}
                    pid={pid}
                    oldDate={oldDate}
                />
            } */}

            {
                model &&
                <ImageModal
                    setModel={setModel}
                    model={model}
                    singleImage={singleImage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    setSingleImage={setSingleImage}
                    setIndice={setIndice}

                    pallImages={pallImages}
                    indice={indice}
                    pid={pallet.pid}
                // reportId={reportId}
                // setUpdateVal={setUpdateVal}
                // updateVal={updateVal}
                />
            }

            <button
                className="pallet-ref mb-2 accordeon-button"
                onClick={() => setActiveAccordeon(!activeAccordeon)}
            >
                <div className="accordeon-pallet"><h3 className="mr-1">Pallet</h3> <span>{i + 1}</span></div>
                <img src="/assets/img/chevron-down.svg" alt="chevron-down" className={activeAccordeon ? "chevron-down" : "chevron-up"} />

            </button>

            <h3 className="mb-05 pallet-item">Labels</h3>
            <div className="grid-table mb-2">
                {
                    labels.map((itemLab, i) => (
                        <div className="table accordeon-table" key={i}>
                            <p>{itemLab.label}</p>
                            <strong>{itemValor(itemLab.valor, itemLab.tipe)}</strong>
                            {/* <button
                                className="accordeon-edit"
                            onClick={() => activeModal(itemLab.tipe, pid, itemLab.name, 'labels', itemLab.label, itemLab.valor)}
                            >
                                <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                            </button> */}
                        </div>
                    ))
                }
            </div>


            <h3 className="mb-05 pallet-item">Appearance</h3>
            <div className="grid-table mb-2">
                {
                    appareance.map((itemApp, i) => (
                        <div className="table accordeon-table" key={i}>
                            <p>{itemApp.label}</p>

                            <div className="grid">
                                {
                                    itemApp.tipe !== "arrays"
                                        ? <strong className="span-6">{itemValor(itemApp.valor)}</strong>
                                        : <>
                                            {
                                                itemApp.valor.map((item, g) => (
                                                    <strong className="span-6" key={g}>{itemValor(item)}</strong>
                                                ))
                                            }
                                        </>
                                }
                                {/* <button
                                    className="accordeon-edit"
                                onClick={() => activeModal(itemApp.tipe, pid, itemApp.name, 'appareance', itemApp.label, itemApp.valor)}
                                >
                                    <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                                </button> */}
                            </div>
                        </div>
                    ))
                }
            </div>



            <div className="grid-img">
                {
                    pallet.images &&

                    (pallet.images)?.map((img, u) => (
                        <div key={u} className="img-g">
                            <img src={img.imgURL_low} alt={`imgh${u}`}
                                onClick={() => imagesArray(pallet.images, u)}
                            />
                        </div>
                    ))
                }
            </div>

            {/* <div className='mb-1'>
                <button

                    onClick={() => setOpenModalFile(true)}
                    className="add-file">
                    <img src="/assets/img/upload-life.svg" alt="img-icon" />


                    <span>Add Pictures</span>
                </button>
            </div> */}



            <div className='w-100 mt-1'>


                <div className="score-wraper">
                    <p>Score</p>
                    <button
                        className="score-btn"
                        onClick={() => activeModalScore(pallet.score)}
                    > {colorScore(pallet.score)}

                    </button>
                </div>

                <div className='score-wraper py-1'>
                    <p>QC Appreciation</p>
                    <button
                        className="score-btn"
                        onClick={() => activeModalScore(pallet.grade)}
                    > {colorGrade(pallet.grade)}

                    </button>
                </div>

                <div className='score-wraper wraper-up pb-05'>
                    <p>Suggested commercial action</p>
                    <button
                        className="score-btn"
                        onClick={() => activeModalScore(pallet.action)}
                    > {colorAction(pallet.action)}

                    </button>
                </div>
            </div>


            {
                pallet.addGrower &&
                <GrowerTable addGrower={pallet.addGrower}/>
            }
        </div>

    )
}