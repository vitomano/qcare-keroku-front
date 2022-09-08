import React from 'react'
import { actionToString } from '../helpers/colorAction'
import { gradeToString } from '../helpers/colorGrade'

export const CardPreReportInfo = ({ mainData, grade, action, addGrower=undefined }) => {

    return (
        <div className="prereport-card__content">
            <div className='boxes-grower mr-05'>
                <p className='font-normal'>
                    {
                        addGrower === undefined
                            ? mainData.grower || "--"
                            : addGrower.grower_variety || mainData.grower || "--"
                    }
                </p>
                <p className='font-normal mr-02 bold'>{mainData.total_boxes || '--'}</p>
            </div>
            <div className='grade mr-05'>
                {
                    gradeToString(grade.toString())
                }
            </div>
            <div className='action'>

                {
                    actionToString(action.toString())
                }
            </div>
        </div>

    )
}