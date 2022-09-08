import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Charging } from './Charging';


import qcareApi from '../../api/qcareApi'
import { conditionsData } from '../../data/conditions';


export const ModalDay = ({ setOpenModalDay, dayNum, lifeTestId, reloaded }) => {

    const [temperature, setTemperature] = useState(0)
    const [selectedImage, setSelectedImage] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [newConditions, setNewConditions] = useState([])
    const [loo, setLoo] = useState(false)
    const tempRef = useRef()

    const closeModal = () => setOpenModalDay(false)


    const sendEditItem = async () => {
        setLoo(true)
        try {
            const formData = new FormData();

            for (const img of selectedImage) {
                formData.append('multerLife', img)
            }
            for (const con of newConditions) {
                formData.append('conditions', con)
            }

            formData.append('lifeTestId', lifeTestId)
            formData.append('temperature', temperature)
            formData.append('day_date', startDate)
            formData.append('day', dayNum)

            await qcareApi.put('/life-test/add-day', formData)
            setLoo(false)
            reloaded()
            setOpenModalDay(false)
            toast.success(`Day ${dayNum} has been added`)

        } catch (error) {
            console.log(error)
            setLoo(false)
            setOpenModalDay(false)
            toast.error('Something went wrong')
        }
    };

    const handleCondition = (e) => {
        if (!newConditions.some(n => n === e.target.value)) {
            setNewConditions(c => [...c, e.target.value])
        }
    };

    const handleImages = (e) => {
        setSelectedImage(e.target.files)
    }


    return (
        <div className="modal">

            <div className="modal__card">
                {
                    loo
                        ?
                        <div>
                            <Charging />
                            <p style={{ marginTop: "70px" }}>Adding Day {dayNum}</p>
                        </div>
                        :
                        <div className="modal__content">
                            <label className="modal-label mb-2">Day {dayNum}</label>


                            <div className='grid mb-1'>
                                <label className="span-6 ">Date</label>

                                <div className='span-6'>
                                    <DatePicker
                                        className="date-input"
                                        dateFormat="dd / MM / yyyy"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        maxDate={new Date()}
                                        placeholderText="Select a date"
                                    />
                                </div>
                            </div>


                            <div className='grid mb-1'>
                                <label className="span-6 ">Temperature</label>
                                <input
                                    className="d-input span-6"
                                    ref={tempRef}
                                    type="number"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    onClick={() => tempRef.current.select()}
                                />
                            </div>

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

                            <label htmlFor="imgs-life" className="upload-label mb-1 mt-1">

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
                                id="imgs-life"
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
                }

            </div>



        </div>
    )
}