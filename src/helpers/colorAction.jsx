import React from 'react'

export const actionToString = (action='0') => {
    switch (action) {
        case "1": return(<div className={`action-${action}`}><p>Dump</p></div>)
        case "2": return(<div className={`action-${action}`}><p>Rejected</p></div>)
        case "3": return(<div className={`action-${action}`}><p>Hold</p></div>)
        case "4": return(<div className={`action-${action}`}><p>Priority for Departure</p></div>)
        case "5": return(<div className={`action-${action}`}><p className='font-xsmall'>Suitable for QC check / Repack</p></div>)
        case "6": return(<div className={`action-${action}`}><p>Suitable for departure</p></div>)
        case "7": return(<div className={`action-${action}`}><p>Suitable for Storage</p></div>)
                
        default:
            return(<div>NO</div>)
    }
};


export function colorAction(action="0"){

    if (action === "0") {
        return (
            <div className="score score-0">
                <p>No QC Action</p>
            </div>)
    }

    if (action === "1") {
        return (
            <div className="score score-2">
                <p>Dump</p>
            </div>)
    }
    if (action === "2") {
        return (
            <div className="score score-2">
                <p>Rejected</p>
            </div>)
    }
    if (action === "3") {
        return (
            <div className="score score-4">
                <p>Hold</p>
            </div>)
    }
    if (action === "4") {
        return (
            <div className="score score-5">
                <p className='font-xsmall'>Priority for Departure</p>
            </div>)
    }
    if (action === "5") {
        return (
            <div className="score score-5">
                <p className='font-xsmall'>Suitable for QC check / Repack</p>
            </div>)
    }
    if (action === "6") {
        return (
            <div className="score score-6">
                <p className='font-xsmall'>Suitable for departure</p>
            </div>)
    }
    if (action === "7") {
        return (
            <div className="score score-7">
                <p className='font-small'>Suitable for storage</p>
            </div>)
    }
  
}