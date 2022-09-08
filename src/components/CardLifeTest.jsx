import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { dateFormat } from '../helpers/dateFormat'
import { ActiveBtn } from './ui/ActiveBtn'

export const CardLifeTest = ({ reportId, date, grower, status = true, score, test, _id }) => {

    return (
        <Link to={`/life-test/${_id}`}>
            <div className="life-item border-b">

                <ActiveBtn status={status} test={test}/>

                <div className="life-title ml-1">
                    <h4>{reportId?.mainData?.pallet_ref || "--"}</h4>
                    <div className='flex life-title__data'>
                        <p className="text-muted">{dateFormat(date) || "--"}</p>
                        <p className="text-muted">{grower || reportId?.mainData?.grower ||'--'}</p>
                    </div>
                </div>
                <div className='life-days'>
                    {
                        test.length > 0
                            ?
                            test.map(() => (
                                <div key={uuidv4()} className="day-on"></div>
                            ))
                            :
                            <div className="day-off"></div>
                    }
                </div>

            </div>
        </Link>
    )
}
