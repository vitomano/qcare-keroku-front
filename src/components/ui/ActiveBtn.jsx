import React, { useState, useEffect } from 'react'

export const ActiveBtn = ({status=true, test=[]}) => {

    const [newStatus, setNewStatus] = useState("status-active")
    const [statusText, setStatusText] = useState("PENDING")

    useEffect(() => {
        // está activo y 0 días
        if(!status && test.length === 0) {
            setNewStatus("status-pending")
            setStatusText("PENDING")
        }
        // está activo y + días
        else if(!status && test.length > 0){
            setNewStatus("status-in-process")
            setStatusText("IN PROCESS")
        }

        else if(status){
            setNewStatus("status-done")
            setStatusText("DONE")
        }
    }, [status, test])
    

    return (
        <div className={`life-status text-center ${newStatus}`}>
            <p>{statusText}</p>
        </div>
    )
}

