import React from 'react'
import { Link } from 'react-router-dom'
import { classToScore } from '../helpers/colorScore'
import { dateFormat } from '../helpers/dateFormat'
import { useOldDate } from '../hooks/useOldDate'

export const CardReport = ({ setOpenConfirmation, setCurrentId, pallets, id, mainData, date, palletRef, score }) => {

    const { oldDate } = useOldDate(date)

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
            {
                <button
                    className="remove"
                    onClick={() => {
                        setCurrentId(id)
                        setOpenConfirmation(true)
                        }}>
                    <svg version="1.1" viewBox="0 0 200 200">
                        <polygon points="194.7,17 183,5.3 100,88.2 17,5.3 5.3,17 88.2,100 5.3,183 17,194.7 100,111.8 183,194.7 194.7,183 111.8,100 " />
                    </svg>
                </button>
            }
            {
                <span
                    className={`circle-score circle-score${classToScore(oldDate, score.toString())
                        }`}
                ></span>
            }

        </div>
    )
}
