import React from 'react'
// import { blockInvalidChar } from '../../helpers/eliminarEs'
import useForm from '../../hooks/useForm'

export const Modal = ({ setOpenModal, addPallItem, palletItem, samples }) => {

    const closeModal = () => {
        setOpenModal(false)
    }

    const [inpForma, handleNameChange] = useForm({
        labelName: "",
        valorName: "",
    })

    const { labelName, valorName } = inpForma

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content">
                    <label>Input Name</label>
                    <input
                        className="mb-2"
                        type="text"
                        name="labelName"
                        value={labelName}
                        onChange={handleNameChange}
                    />
                    {
                        palletItem !== 'pallgrow' &&
                        <label>Value</label>
                    }
                    {
                        palletItem !== 'pallgrow' &&
                            <input
                                className="mb-2"
                                type="text"
                                name="valorName"
                                value={valorName}
                                onChange={handleNameChange}
                            />
                    }

                    <div className="modal__botones">
                        <button
                            className="modal-btn btn-close mr-05"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="modal-btn btn-add ml-05"
                            onClick={() => addPallItem(palletItem, labelName.trim(), valorName.trim(), samples)}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>



        </div>
    )
}
