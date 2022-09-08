import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import qcareApi from '../../api/qcareApi'


export const ModalEdit = ({ setOpenModal,
    reportId,
    pid,
    label,
    itemName,
    detailName,
    tipo,
    currentVal,
    toast,
    updateVal,
    setUpdateVal
}) => {

    const [valRef, setValRef] = useState(currentVal)

    const inputRef = useRef()

    const handleSelect = () => {
        const input = inputRef.current
        input.select()
    }

    const handleChange = (e) => {
        if (tipo === "range") {
            setValRef(e.target.value)
        } else if (tipo === "checkbox") {
            setValRef(e.target.checked)
        } else if (tipo === "text") {
            setValRef(e.target.value)
        } else if (tipo === "number") {
            setValRef(e.target.value)
        }
    }

    const handleChangeArray = (i, e) => {
        let newArr = [...valRef]
        newArr[i] = e.target.value
        setValRef(newArr)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const sendEditItem = async () => {

        if (tipo === "checkbox" && typeof currentVal !== "boolean") return
        if (currentVal === valRef) {
            setOpenModal(false)
            return
        }

        try {

            const { data } = await qcareApi.put(`/report/edit-item`, {
                reportId,
                palletId: pid,
                detailName,
                itemName,
                itemValue: valRef
            })

            setOpenModal(false)

            setUpdateVal(!updateVal)
            data.editItem.n === 1
                ? toast.success(`${label} Value has been changed`)
                : toast.error('Something went wrong')

        } catch (error) {
            console.log(error)
            setOpenModal(false)
            toast.error('Something went wrong')
        }
    };


    const addSample = () => setValRef(c => [...c, "0"])
    const removeSample = () => {
        let newArr = [...valRef]
        newArr.pop()
        setValRef(newArr)
    }

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content">
                    <label className="modal-label mb-2">{label}</label>


                    {
                        tipo === "checkbox" &&
                        <div className="input-range">
                            <label className="switch">
                                <input
                                    type={tipo}
                                    checked={valRef}
                                    name={itemName}
                                    onChange={handleChange}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="span-checkbox">
                                {valRef ? "Yes" : "No"}
                            </span>

                        </div>
                    }
                    {
                        tipo === "text" &&
                        <input
                            type={tipo}
                            ref={inputRef}
                            value={valRef}
                            name={itemName}
                            onChange={handleChange}
                            onClick={handleSelect}
                        />
                    }
                    {
                        tipo === "range" &&
                        <div className="input-range">
                            <input
                                type={tipo}
                                value={valRef}
                                min={1}
                                max={7}
                                step="1"
                                name={itemName}
                                onChange={handleChange}
                            />
                            <span className="span-range">{valRef}</span>
                        </div>
                    }
                    {
                        tipo === "number" &&
                        <input
                            type={tipo}
                            ref={inputRef}
                            value={valRef}
                            min="0"
                            name={itemName}
                            onChange={handleChange}
                            onClick={handleSelect}
                        />
                    }
                    {
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

                    }





                    <div className="modal__botones mt-2">
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