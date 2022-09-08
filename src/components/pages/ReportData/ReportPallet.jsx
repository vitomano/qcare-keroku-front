import React from 'react'
import { Accordeon } from '../../ui/Accordeon'

export const ReportPallet = ({ pallets, format, reportId, updateVal, setUpdateVal, fruit, oldDate }) => {

    console.log(pallets)

    return (
        <div className="pallets-container">
            {
                pallets.map((onePallet, i) => {


                    const labels = onePallet.details.labels || []
                    const appareance = onePallet.details.appareance || []
                    const pallgrow = onePallet.details?.pallgrow || []
                    const prereport = onePallet.prereport || []

                    const weight_format = parseInt((onePallet.details?.pallgrow?.find(app => app.name === "weight_10"))?.valor) || 0

                    return (

                        <Accordeon
                            key={onePallet.pid}
                            oldDate={oldDate}
                            pid={onePallet.pid}
                            format={format}
                            labels={labels}
                            appareance={appareance}
                            pallgrow={pallgrow}
                            weight_format={weight_format}
                            i={i}
                            onePallet={onePallet}
                            reportId={reportId}
                            score={onePallet.score}
                            updateVal={updateVal}
                            setUpdateVal={setUpdateVal}
                            fruit={fruit}
                            addGrower={onePallet.addGrower}
                            prereport={prereport}
                        />

                    )
                })
            }
        </div>
    )
}
