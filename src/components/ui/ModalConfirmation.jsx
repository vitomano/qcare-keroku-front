import React from 'react'

export const ModalConfirmation = ({closeConfirmation, msg, action}) => {

    return (
        <div className="modal">

            <div className="modal__card">
                <div className="modal__content">

                <label className="modal-label mb-1">Confirmation</label>
                {
                    msg &&
                    <p className='mb-1 font-medium'>{msg}</p>
                }

                    <div className="modal__botones mt-1">
                        <button
                            className="modal-btn btn-muted mr-05"
                            onClick={()=>closeConfirmation(false)}
                        >
                            Close
                        </button>
                        <button
                            className="modal-btn btn-remove ml-05"
                            onClick={()=>action()}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>



        </div>
    )
}
