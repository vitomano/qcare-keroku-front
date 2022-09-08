import React from 'react'
import { tituloEs } from '../../../helpers/eliminarEs'
import objToArray from '../../../helpers/objToArray'

export const ReportMain = ({ mainData }) => {

    const mainDatos = objToArray(mainData)

    return (
        <div className="main-info mb-2">
            {
                mainDatos.map((item, i) => (
                    <div className="main-info__item mb-05" key={i}>
                        <div>
                            {/* <button
                                className="accordeon-edit"
                            // onClick={() => activeModal(itemPall.tipe, pid, itemPall.name, 'pallgrow', itemPall.label, itemPall.valor)}
                            >
                                <img src="/assets/img/edit-grey.svg" alt="edit-item" />
                            </button> */}
                            {
                                item[0] === 'gln_ggn'
                                    ? <p>GLN/GGN</p>
                                    : <p>{tituloEs(item[0])}</p>
                            }
                        </div>

                        <p className="bold">{item[1]}</p>
                    </div>
                ))

            }
        </div>
    )
}
