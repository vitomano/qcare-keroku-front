import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { LabelsInput } from './Inputs/LabelsInput'
import { AppareanceInput } from './Inputs/AppareanceInput'
import { Modal } from '../ui/Modal'
import { inputJson } from '../../helpers/eliminarEs';
import { ScoreItem } from '../ScoreItem';


export const PalletPreReport = ({ pallets, pallet, id, handleRemovaPallet, setPallets, addGrower, normalScore }) => {

    const [selectedImage, setSelectedImage] = useState(pallet.images)
    const [openModal, setOpenModal] = useState(false)
    const [palletItem, setPalletItem] = useState("")

    const [newScore, setNewScore] = useState(pallet.score || "0")
    const [newGrade, setNewGrade] = useState(pallet.qcgrade || "0")
    const [newAction, setNewAction] = useState(pallet.qcaction || "0")

    const handleImages = (e) => {
        setSelectedImage(e.target.files)
        pallet.images = e.target.files
    }

    const handleModal = (itemName) => {
        setPalletItem(itemName)
        setOpenModal(!openModal)
    }

    const handleSelect = (e, item) => {

        switch (item) {
            case 'score':
                setNewScore(e.target.value)
                pallet.score = e.target.value
                break;

            case 'grade':
                setNewGrade(e.target.value)
                pallet.qcgrade = e.target.value
                break;

            case 'action':
                setNewAction(e.target.value)
                pallet.qcaction = e.target.value
                break;

            default:
                break;
        }



    }

    const addPallItem = (labappal, labelNew, valorNew = "0") => {

        if (labelNew.length <= 0) {
            toast.error('Input Name incomplete')
            return
        }

        // if (/^[A-Za-z0-9 -]*$/.test(labelNew) === false) {
        if (/^[a-zA-Z_ ]*$/.test(labelNew) === false) {
            toast.error('Input Name should only contain letters')
            return
        }

        if (labappal === "labels") {

            const labelExist = pallet.labels.find(labl => labl.label === labelNew)
            const nameExist = pallet.labels.find(labl => labl.name === inputJson(labelNew))

            if (labelExist || nameExist) {
                toast.error('This input already exist')
                return
            }

            pallet.labels.push(
                {
                    check: true, tipe: "text", label: labelNew, name: inputJson(labelNew), valor: valorNew
                },
            )
        } else if (labappal === "appareance") {

            const labelExist = pallet.appareance.find(labl => labl.label === labelNew)
            const nameExist = pallet.appareance.find(labl => labl.name === inputJson(labelNew))

            if (labelExist || nameExist) {
                toast.error('This input already exist')
                return
            }

            pallet.appareance.push(
                {
                    check: true, tipe: "text", label: labelNew, name: inputJson(labelNew), valor: valorNew
                },
            )
        }

        setPallets((c) => [...c])
    }


    return (
        <div className="mb-1 card-pallet">

            {
                openModal &&
                <Modal
                    setOpenModal={setOpenModal}
                    addPallItem={addPallItem}
                    id={id}
                    palletItem={palletItem}
                />
            }

            <h3 className="mb-1">Pallet</h3>
            <button
                className="remove-pallet"
                onClick={() => handleRemovaPallet(id)}
            >remove</button>

            <p className='input-title'>Labels</p>

            {
                pallet.labels.map((inp, i) => (
                    <LabelsInput
                        key={i}
                        id={i}
                        tipe={inp.tipe}
                        label={inp.label}
                        name={inp.name}
                        minVal={inp.minVal}
                        maxVal={inp.maxVal}
                        valor={inp.valor}
                        check={inp.check}
                        pallet={pallet}
                        inpu={inp}
                    />
                ))
            }
            <button
                onClick={() => handleModal("labels")}
                className="modal-add"
            >
                <div className="mr-05"><span>+</span></div>
                <span>Add item</span>
            </button>

            <hr />

            <p className='input-title'>Appearance</p>

            {
                pallet.appareance.map((inp, i) => (
                    <AppareanceInput
                        key={i}
                        id={i}
                        tipe={inp.tipe}
                        label={inp.label}
                        name={inp.name}
                        minVal={inp.minVal}
                        maxVal={inp.maxVal}
                        valor={inp.valor}
                        check={inp.check}
                        pallet={pallet}
                        arrays={inp.arrays}
                    />
                ))
            }
            <button
                onClick={() => handleModal("appareance")}
                className="modal-add mb-1"
            >
                <div className="mr-05"><span>+</span></div>
                <span>Add item</span>
            </button>

            <hr />

            <div className='score-wraper'>
                <p>QC Appreciation</p>
                <select onChange={(e) => handleSelect(e, "grade")} value={newGrade}>
                    <option value="0">Select a Grade</option>
                    <option value="1">Industry</option>
                    <option value="2">Borderline CAT 2</option>
                    <option value="3">CAT 2</option>
                    <option value="4">Borderline CAT 1</option>
                    <option value="5">CAT 1</option>
                    <option value="6">Extra</option>
                </select>
            </div>

            <div className='score-wraper py-05'>
                <p>Suggested commercial action</p>
                <select onChange={(e) => handleSelect(e, "action")} value={newAction}>
                    <option value="0">Select an Action</option>
                    <option value="1">Dump</option>
                    <option value="2">Rejected</option>
                    <option value="3">Hold</option>
                    <option value="4">Priority for Departure</option>
                    <option value="5">Suitable for QC check/REPACK</option>
                    <option value="6">Suitable for departure</option>
                    <option value="7">Suitable for Storage</option>
                </select>
            </div>

            <div className="score-wraper pb-05">
                <p>Score</p>
                <select onChange={(e) => handleSelect(e, "score")} value={newScore}>
                    <option value="0">Select a Score</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>

            <div className="score-wraper pb-2">
                {
                    pallet.newGrower &&

                    <div className='w-100 mt-1'>

                        <div className='score-grid score-header mt-1'>
                            <p className='text-center'>Grower/Variety</p>
                            <p className='text-center'>Boxes</p>
                        </div>

                        <ScoreItem
                            pallet={pallet}
                            grower={pallet.newGrower.grower_variety}
                            boxes={pallet.newGrower.boxes}
                        />
                    </div>
                }
            </div>

            {
                !pallet.newGrower
                    ?
                    <button
                        onClick={addGrower}
                        // onClick={() => addGrower(id)}
                        className="modal-add mb-2"
                    >
                        <div className="mr-05"><span>+</span></div>
                        <span>Add grower/variety</span>
                    </button>
                    :
                    <button
                        onClick={() => normalScore(id)}
                        className="modal-add mb-2"
                    >
                        <div className="mr-05"><span className='back-chevron'>&#8249;</span></div>
                        <span>Back</span>
                    </button>
            }

            <label htmlFor={`img${id}`} className="upload-label mb-1 mt-2">

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
                id={`img${id}`}
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
        </div>
    )
}
