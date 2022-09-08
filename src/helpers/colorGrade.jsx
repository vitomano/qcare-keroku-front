import React from 'react'

export const gradeToString = (grade='0') => {
    switch (grade) {
        case "1": return(<div className={`grade-${grade}`}><p>Industry</p></div>)
        case "2": return(<div className={`grade-${grade}`}><p>Borderline CAT 2</p></div>)
        case "3": return(<div className={`grade-${grade}`}><p>CAT 2</p></div>)
        case "4": return(<div className={`grade-${grade}`}><p>Borderline CAT 1</p></div>)
        case "5": return(<div className={`grade-${grade}`}><p>CAT 1</p></div>)
        case "6": return(<div className={`grade-${grade}`}><p>Extra</p></div>)
                
        default:
            return(<div>NO</div>)
    }
};


export function colorGrade(grade="0"){

    if (grade === "0") {
        return (
            <div className="score score-0">
                <p>No QC Grade</p>
            </div>)
    }

    if (grade === "1") {
        return (
            <div className="score score-2">
                <p>Industry</p>
            </div>)
    }
    if (grade === "2") {
        return (
            <div className="score score-3">
                <p>Borderline CAT 2</p>
            </div>)
    }
    if (grade === "3") {
        return (
            <div className="score score-4">
                <p>CAT 2</p>
            </div>)
    }
    if (grade === "4") {
        return (
            <div className="score score-5">
                <p>Borderline CAT 1</p>
            </div>)
    }
    if (grade === "5") {
        return (
            <div className="score score-6">
                <p>CAT 1</p>
            </div>)
    }
    if (grade === "6") {
        return (
            <div className="score score-7">
                <p>Extra</p>
            </div>)
    }
  
}