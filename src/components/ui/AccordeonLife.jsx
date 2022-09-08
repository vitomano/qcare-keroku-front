import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { tituloEs } from '../../helpers/eliminarEs'
import { ModalEditDay } from './ModalEditDay';
import { ModalLifeImage } from './ModalLifeImage';
// import { colorScore } from '../../helpers/colorScore'
// import { percentage } from '../../helpers/percentage'
// import { ImageModal } from '../pages/ImageModal'
// import { ModalEdit } from './ModalEdit'

// import toast from 'react-hot-toast';
// import { ModalEditScore } from './ModalEditScore'
// import { ChartPie } from './ChartPie'
// import { colorScoreOldReports } from '../../helpers/colorScoreOldReports'


export const AccordeonLife = ({ lifeId, _id, conditions, temperature, images, index, reloaded }) => {

    const [activeAccordeon, setActiveAccordeon] = useState(true)

    /* Modal */
    const [openModal, setOpenModal] = useState(false)
    const [openModalFile, setOpenModalFile] = useState(false)


    return (
        <div className={`${activeAccordeon ? "accordeon show" : "accordeon"} card-accordeon p-1 mb-1`}>

            {
                openModal &&
                <ModalEditDay
                    setOpenModal={setOpenModal}
                    conditions={conditions}
                    temperature={temperature}
                    lifeId={lifeId}
                    dayId={_id}
                    reloaded={reloaded}
                    dayNum={index + 1}
                />
            }


            {
                openModalFile &&
                <ModalLifeImage
                    setOpenModalFile={setOpenModalFile}
                    lifeId={lifeId}
                    dayId={_id}
                    reloaded={reloaded}
                />
            }

            {/* 

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
                    toast={toast}

                />
            } */
            }

            <button
                className="pallet-ref mb-1 accordeon-button"
                onClick={() => setActiveAccordeon(!activeAccordeon)}
            >
                <h3 className="mr-1">Day {index + 1}</h3>
                <img src="/assets/img/chevron-down.svg" alt="chevron-down" className={activeAccordeon ? "chevron-down" : "chevron-up"} />
            </button>

            <div className='edit-day mb-05'>
                <div className='flex'>
                    <p className='bold mr-05'>Temperature:</p>
                    <p className='bold'>{temperature || '--'}°</p>
                </div>
                <button
                    onClick={() => setOpenModal(true)}
                >
                    <img src="/assets/img/edit.svg" alt="edit-day" />
                </button>
            </div>


            <div>
                <p className='bold mb-02'>Conditions: {conditions.length === 0 && <span className='font-small text-muted'>(None)</span>}</p>

                {
                    conditions.length > 0 &&
                    <div className='modal-conditions'>
                        {conditions.map(con => (
                            <button key={uuidv4()} className="mr-05 mb-05 modal-conditions__item">
                                {tituloEs(con)}
                            </button>
                        ))
                        }
                    </div>
                }
            </div>

            {
                images.length > 0 &&
                <div className="grid-img mt-1">

                    {images.map((img, index) => (
                        <div key={index} className="img-g">
                            <img src={img.imgURL_low} alt={`imgh${index}`}
                                // onClick={() => openCarousel(index)}
                            />
                        </div>
                    ))}
                </div>
            }

            <div>
                <button
                    onClick={() => setOpenModalFile(true)}
                    className="add-file">
                    <img src="/assets/img/upload-life.svg" alt="img-icon" />
                    <span>Add Pictures</span>
                </button>
            </div>

        </div>

    )
}