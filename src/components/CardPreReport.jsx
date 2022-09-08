import React from 'react'
import { Link } from 'react-router-dom'
import { dateFormat } from '../helpers/dateFormat'
import { CardPreReportInfo } from './CardPreReportInfo'

export const CardPreReport = ({ pallets, id, mainData, endDate, palletRef, grade, action }) => {

    const existGrower = pallets.some(pall => pall.addGrower !== null)
    
    return (
        <div className="prereport-card mb-1">

            <Link to={`/prereport/${id}`}>

                <div className="prereport-card__title mb-05">
                    <h4>{palletRef}</h4>
                    <p className="prereport-card__date mr-02">{dateFormat(endDate) || "--"}</p>
                </div>

                <div className={`${existGrower && 'grower-margin'}`}>
                    {
                        existGrower
                            ?
                            pallets.map(pal => (
                                <CardPreReportInfo
                                    key={pal.pid}
                                    palletRef={palletRef}
                                    mainData={mainData}
                                    {...pal}
                                />
                            ))

                            : <CardPreReportInfo grade={grade} action={action} mainData={mainData} />
                    }
                </div>

            </Link>
            {/* {
                <button
                    className="remove"
                    onClick={() => console.log('hola')}>
                    <svg version="1.1" viewBox="0 0 200 200">
                        <polygon points="194.7,17 183,5.3 100,88.2 17,5.3 5.3,17 88.2,100 5.3,183 17,194.7 100,111.8 183,194.7 194.7,183 111.8,100 " />
                    </svg>
                </button>
            }
            {
                <span
                    className={`circle-score circle-score${score.toString()}`}
                ></span>
            } */}

        </div>
    )
}
