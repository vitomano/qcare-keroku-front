import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'
import qcareApi from '../../api/qcareApi'
import { conditionsData } from '../../data/conditions';


export const ModalEditDay = ({ setOpenModal,
    conditions,
    temperature,
    lifeId,
    dayId,
    dayNum,
    reloaded
}) => {

    const [newTemperature, setNewTemperature] = useState(temperature)
    const [newConditions, setNewConditions] = useState(conditions)
    const tempRef = useRef()

    const closeModal = () => setOpenModal(false)

    const sendEditItem = async () => {

        try {

            await qcareApi.put(`/life-test/edit-day`, {
                lifeId,
                dayId,
                conditions: newConditions,
                temperature: newTemperature
            })

            setOpenModal(false)

            reloaded()
            toast.success(`Day ${dayNum} has been updated`)

        } catch (error) {
            console.log(error)
            setOpenModal(false)
            toast.error('Something went wrong')
        }
    };


    const handleCondition = (e) => {
        if (!newConditions.some(n => n === e.target.value)) {
            setNewConditions(c => [...c, e.target.value])
        }
    };

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content">

                    <label className="modal-label mb-2">Day {dayNum}</label>


                    <div className='grid mb-1'>
                        <label className="span-6 ">Temperature</label>
                        <input
                            className="d-input span-6"
                            ref={tempRef}
                            type="number"
                            value={newTemperature}
                            onChange={(e) => setNewTemperature(e.target.value)}
                            onClick={() => tempRef.current.select()}
                        />
                    </div>

                    {/* {
                        tipo === "arrays" &&
                        <>
                            <div
                                className={`${valRef.length > 6 && "multiColumn"} mb-05`}
                            >
                                {
                                    valRef.map((val, i) => (
                                        <div className='flex mb-05' key={i}>
                                            <p className='column-index'>{i + 1}.</p>
                                            <input
                                                type="text"
                                                ref={inputRef}
                                                value={val}
                                                onChange={(e) => handleChangeArray(i, e)}
                                            />
                                        </div>
                                    )
                                    )
                                }
                            </div>
                            {
                                detailName === "pallgrow" &&
                                <div className='plus-add'>
                                    <button
                                        className="plus-btn mr-1 mt-05"
                                        onClick={removeSample}
                                    >-</button>

                                    <button
                                        className="plus-btn mt-05"
                                        onClick={addSample}
                                    >+</button>
                                </div>
                            }
                        </>
                    } */}

                    <div className='grid mb-2'>
                        <label className="span-6 ">Conditions</label>
                        <div className="span-6 select-input">
                            <select
                                placeholder='Select'
                                className='select-border'
                                onChange={handleCondition}
                                value="Select an option">
                                <option>Select options</option>
                                {
                                    conditionsData.sort().map(item => (
                                        <option value={item} key={uuidv4()}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className='mb-05 modal-conditions'>
                        {
                            newConditions.length > 0 &&
                            newConditions.map((condition, i) => (
                                <button key={i} className="flex mb-1 mr-1 modal-conditions__button">
                                    {condition}
                                    <div
                                        onClick={() => setNewConditions(newConditions.filter(item => item !== condition))}
                                    >&#x2715;</div>
                                </button>
                            ))
                        }
                    </div>

                    <div className="modal__botones mt-1">
                        <button
                            className="modal-btn btn-close mr-05"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="modal-btn btn-add ml-05"
                            onClick={sendEditItem}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>



        </div>
    )
}