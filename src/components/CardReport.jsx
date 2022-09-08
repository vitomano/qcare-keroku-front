import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { classToScore } from '../helpers/colorScore'
import { dateFormat } from '../helpers/dateFormat'
import { useOldDate } from '../hooks/useOldDate'
import { InfoBox } from './ui/InfoBox'

export const CardReport = ({ setOpenConfirmation, setCurrentId, pallets, id, mainData, date, palletRef, score }) => {

    const { oldDate } = useOldDate(date)
    const [activeDots, setActiveDots] = useState(false)
    const coverImg = pallets?.find(cover => cover.images.length > 0)

    return (
        <div className="card mb-1">

            <Link
                to={`/report/${id}`}
                className="card__image">

                <img src={(coverImg === undefined)
                    ? "/assets/img/no-image.jpg"
                    : coverImg?.images[0].imgURL_low || coverImg?.images[0].imgURL
                } alt="img-pallet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

            </Link>

            <Link to={`/report/${id}`} className="card__content">
                <div className="card__body">
                    <div className="card__title">
                        <h4>{palletRef}</h4>
                    </div>
                    <p className="card__text">{mainData.supplier || "--"}</p>
                    <p className="card__text">{mainData.total_pallets || "--"}</p>
                    <p className="card__text"><small className="text-muted">{dateFormat(date) || "--"}</small></p>
                </div>
            </Link>

            <button
                className="remove"
                onClick={() => {
                    setActiveDots(true)
                }}>
                <img src='../assets/img/dots-icon.svg' alt="dots-icon" />
            </button>

            <InfoBox
                show={activeDots}
                onClickOutside={() => { setActiveDots(false) }}
                setCurrentId={setCurrentId}
                id={id}
                setOpenConfirmation={setOpenConfirmation}
            />

            {/* {
                activeDots &&
                <div className='window-card'
                ref={refOne}
                >
                    <p className='font-normal mb-05'>Send report</p>
                    <p className='font-normal'
                        onClick={() => {
                            setCurrentId(id)
                            setOpenConfirmation(true)
                        }}
                    >Delete</p>
                </div>
            } */}



            <span
                className={`circle-score circle-score${classToScore(oldDate, score.toString())
                    }`}
            ></span>


        </div>
    )
}
