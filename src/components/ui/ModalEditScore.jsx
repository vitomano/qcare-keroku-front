import React from 'react'
import qcareApi from '../../api/qcareApi'



export const ModalEditScore = ({ oldDate = false, reportId, pid, setOpenModalScore, score, newScore, setNewScore, setUpdateVal, updateVal, toast }) => {


    const handleScore = (e) => {
        setNewScore(e.target.value)
    }

    const closeModal = () => {
        setOpenModalScore(false)
    }

    const sendEditItem = async () => {

        if (score === newScore) return

        try {
           
            const { data } = await qcareApi.put('/report/edit-item', {
                score: newScore,
                reportId,
                palletId: pid,
            })

            setOpenModalScore(false)

            setUpdateVal(!updateVal)
            // toast.success("Score has been changed")
            data.editItem.n === 1
                ? toast.success("Score has been changed")
                : toast.error('Something went wrong')

        } catch (error) {
            console.log(error)
            setOpenModalScore(false)
            toast.error('Something went wrong')
        }
    };

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content pallet-comments">
                    <label className="modal-label mb-2">Score</label>

                    {
                        oldDate
                            ?
                            <select onChange={handleScore} value={newScore}>
                                <option value="0">Select an Option</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            :
                            <select onChange={handleScore} value={newScore}>
                                <option value="0">Select an Option</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
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
                            Edit
                        </button>
                    </div>
                </div>
            </div>



        </div>
    )
}
