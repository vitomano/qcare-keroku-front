import React, { useState } from 'react'

import { colorScore } from '../../helpers/colorScore'
import { itemValor, valorPallgrow } from '../../helpers/eliminarEs'
import { percentage } from '../../helpers/percentage'
import { ImageModal } from '../pages/ImageModal'
import { ModalEdit } from './ModalEdit'

import toast from 'react-hot-toast';
import { ModalEditScore } from './ModalEditScore'
import { ChartPie } from './ChartPie'
import { ModalFiles } from './ModalFiles'
import { colorScoreOldReports } from '../../helpers/colorScoreOldReports'
import { colorGrade } from '../../helpers/colorGrade'
import { colorAction } from '../../helpers/colorAction'


export const Accordeon = ({ oldDate, prereport, format, labels, appareance, pallgrow, weight_format, i, onePallet, pid, reportId, score = "0", updateVal, setUpdateVal, addGrower }) => {

    const [model, setModel] = useState(false)
    const [singleImage, setSingleImage] = useState(null)

    const [pallImages, setPallImages] = useState([])
    const [indice, setIndice] = useState(0)

    const [activeAccordeon, setActiveAccordeon] = useState(true)

    const [newScore, setNewScore] = useState(score)


    /* Modal */
    const [openModal, setOpenModal] = useState(false)
    const [openModalScore, setOpenModalScore] = useState(false)
    const [openModalFile, setOpenModalFile] = useState(false)

    const [editContent, setEditContent] = useState({
        reportId: "",
        pid: "",
        label: "",
        itemName: "",
        detailItem: "",
        tipo: "",
        currentVal: ""
    })


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

    const activeModal = (tipo, pid, itemName, detailName, label, currentVal) => {

        setEditContent({
            reportId,
            pid,
            label,
            itemName,
            detailName,
            tipo,
            currentVal
        })

        setOpenModal(true)
    };

    const activeModalScore = () => {
        setOpenModalScore(true)
    };


    return (
        <div className={`${activeAccordeon ? "accordeon show" : "accordeon"} card-accordeon p-1 mb-1`}>


            {
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
            }

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
                    pid={pid}
                    reportId={reportId}
                    setUpdateVal={setUpdateVal}
                    updateVal={updateVal}
                />
            }

            <button
                className="pallet-ref mb-2 accordeon-button"
                onClick={() => setActiveAccordeon(!activeAccordeon)}
            >
                <div className="accordeon-pallet"><h3 className="mr-1">Pallet</h3> <span>{i + 1}</span></div>
                <img src="/assets/img/chevron-down.svg" alt="chevron-down" className={activeAccordeon ? "chevron-down" : "chevron-up"} />

            </button>

            {
                addGrower &&

                <div className='flex mb-3'>
                    <div className='score-header w-100 flex-space-between mr-1 px-1'>
                        <p>Grower/Variety: </p>
                        <p>{addGrower.grower_variety || "--"}</p>
                    </div>

                    <div className='score-header w-100 flex-space-between ml-1 px-1'>
                        <p>Boxes: </p>
                        <p>{addGrower.boxes || "--"}</p>
                    </div>

                </div>
            }

            {
                prereport &&
                <div className="pallet-prereport mb-2 pt-2">
                    <div className='font-small'>Pre report</div>
                    <div className='mb-2'>
                        <h4 className='mb-1'>Labels</h4>
                        {
                            prereport.details.labels.map((lab, i) => (
                                <div key={i} className="flex-space-between border-b">
                                    <p>{lab.label}</p>
                                    <p>{itemValor(lab.valor, lab.tipe) || "--"}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='mb-2'>
                        <h4 className='mb-1'>Appearance</h4>
                        {
                            prereport.details.appareance.map((app, i) => (
                                <div key={i} className="flex-space-between border-b">
                                    <p>{app.label}</p>
                                    <p>{itemValor(app.valor) || "--"}</p>
                                </div>
                            ))
                        }
                    </div>


                    <div className='mt-1'>
                        <div className="score-wraper">
                            <p>Score</p>
                            <button
                                className="score-btn"
                            > {colorScore(prereport.score)}

                            </button>
                        </div>

                        <div className='score-wraper py-1'>
                            <p>QC Appreciation</p>
                            <button
                                className="score-btn"
                            > {colorGrade(prereport.grade)}

                            </button>
                        </div>

                        <div className='score-wraper wraper-up'>
                            <p>Suggested commercial action</p>
                            <button
                                className="score-btn"
                            > {colorAction(prereport.action)}

                            </button>
                        </div>

                    </div>
                </div>
            }

            {
                labels.length > 0 &&
                <>
                    <h3 className="mb-05 pallet-item">Labels</h3>
                    <div className="grid-table mb-2">
                        {
                            labels.map((itemLab, i) => (
                                <div className="table accordeon-table" key={i}>
                                    <p>{itemLab.label}</p>
                                    <strong>{itemValor(itemLab.valor)}</strong>
                                    <button
                                        className="accordeon-edit"
                                        onClick={() => activeModal(itemLab.tipe, pid, itemLab.name, 'labels', itemLab.label, itemLab.valor)}
                                    >
                                        <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </>
            }


            {
                appareance.length > 0 &&
                <>
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
                                        <button
                                            className="accordeon-edit"
                                            onClick={() => activeModal(itemApp.tipe, pid, itemApp.name, 'appareance', itemApp.label, itemApp.valor)}
                                        >
                                            <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }


            {
                pallgrow.length > 0 &&
                <>
                    <h3 className="mb-05 pallet-item">Pall/Grower</h3>
                    <div className="grid-table mb-1">
                        {
                            pallgrow.map((itemPall, i) => {

                                return (
                                    <div className="table accordeon-table" key={i}>
                                        <p>{itemPall.label}</p>
                                        <div className="grid">
                                            <strong className="span-6">{valorPallgrow(itemPall.valor)}{itemPall.name === 'weight_10' && "g"}</strong>
                                            {
                                                (itemPall.name !== "weight_10") &&
                                                <p className="span-6">{percentage(format, weight_format, itemPall.valor)}</p>
                                            }
                                        </div>
                                        <button
                                            className="accordeon-edit"
                                            onClick={() => activeModal(itemPall.tipe, pid, itemPall.name, 'pallgrow', itemPall.label, itemPall.valor)}
                                        >
                                            <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }

            <ChartPie
                pallgrow={pallgrow}
            />

            <div className="grid-img">
                {
                    onePallet.images &&

                    (onePallet.images)?.map((img, u) => (
                        <div key={u} className="img-g">
                            <img src={img.imgURL_low} alt={`imgh${u}`}
                                onClick={() => imagesArray(onePallet.images, u)}
                            />
                        </div>
                    ))
                }
            </div>

            <div>
                <button

                    onClick={() => setOpenModalFile(true)}
                    className="add-file">
                    <img src="/assets/img/upload-life.svg" alt="img-icon" />


                    <span>Add Pictures</span>
                </button>
            </div>


            <div className="score-container mt-1">
                <strong>Score</strong>
                <button
                    className="score-btn"
                    onClick={() => activeModalScore(score)}
                >
                    {
                        oldDate
                            ? colorScoreOldReports(score)
                            : colorScore(score)
                    }
                </button>
            </div>

        </div>

    )
}