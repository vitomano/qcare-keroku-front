import React from 'react'
import { colorAction } from '../../helpers/colorAction'
import { colorGrade } from '../../helpers/colorGrade'
import { colorScore } from '../../helpers/colorScore'
import { itemValor } from '../../helpers/eliminarEs'
// import { blockInvalidChar } from '../../helpers/eliminarEs'

export const ModalPreData = ({ setOpenModal, prereport }) => {

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content">
                    <div className='mb-2'>
                        <h3 className='mb-1'>Labels</h3>
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
                        <h3 className='mb-1'>Appearance</h3>
                        {
                            prereport.details.appareance.map((app, i) => (
                                <div key={i} className="flex-space-between border-b">
                                    <p>{app.label}</p>
                                    <p>{itemValor(app.valor) || "--"}</p>
                                </div>
                            ))
                        }
                    </div>



                    <div className='w-100 mt-1 mb-2'>

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

                        <div className='score-wraper wraper-up pb-05'>
                            <p>Suggested commercial action</p>
                            <button
                                className="score-btn"
                            > {colorAction(prereport.action)}

                            </button>
                        </div>

                    </div>



                    <div className="modal__botones">
                        <button
                            className="modal-btn btn-close mr-05"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        {/* <button
                            className="modal-btn btn-add ml-05"
                            onClick={() => addPallItem(palletItem, labelName.trim(), valorName.trim(), samples)}
                        >
                            Add
                        </button> */}
                    </div>
                </div>
            </div>



        </div>
    )
}
