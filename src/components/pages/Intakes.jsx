import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import qcareApi from '../../api/qcareApi'
import { Charging } from '../ui/Charging'


export const Intakes = () => {

    const [intakes, setIntakes] = useState(["start"])
    const [reload, setReload] = useState(true)


    useEffect(() => {
        getIntakes()
    }, [reload])

    const getIntakes = async () => {

        const { data } = await qcareApi.get('/intakes')

        const newData = (data.intakes).map(d => ({
            id: d._id,
            pallet: d.data.pallet_ref,
            product: d.data.product,
            supplier: d.data.supplier,
            format: d.data.format,
            total_pallets: d.data.total_pallets,
            total_boxes: d.data.total_boxes,
            transport: d.data.transport,
            //data: d.data,
        }))

        const eachCvs = []

        newData.forEach(data => {

            const { product, pallet, supplier, format, total_boxes, total_pallets, transport, id } = data

            //const restArray = Object.entries(datitos)
            const restArray = {
                pallet: pallet || "--",
                product: product || "--",
                supplier: supplier || "--",
                format: format || "--",
                total_boxes: total_boxes || "--",
                total_pallets: total_pallets || 0,
                transport: transport || "--",
                id
            }
            eachCvs.push(restArray)
        })

        setIntakes(eachCvs)

    }


    const handleRemove = async (id) => {

        await qcareApi.delete(`/intakes/delete/${id}`);
        setReload(!reload)
    }

    return (
        <div className="content intake">

            <main className="container">
                <h2 className="main-title mb-2">Intakes</h2>

                <Link to="/newintake" className="card-intake">
                    <svg version="1.1" viewBox="0 0 100 100">
                        <g>
                            <path d="M37.1,60.5c-1.5,1.5-1.5,3.8,0,5.3c0.7,0.7,1.7,1.1,2.7,1.1s1.9-0.4,2.7-1.1l14.7-14.7
c0.3-0.3,0.6-0.7,0.8-1.3c0.4-0.9,0.4-1.9,0-2.8c-0.2-0.5-0.5-0.8-0.8-1.3L42.5,31.1c-1.5-1.5-3.8-1.5-5.3,0s-1.5,3.8,0,5.3
l8.2,8.2H8.9c-2,0.2-3.8,1.9-3.8,3.9s1.7,3.8,3.8,3.8h36.3L37.1,60.5z"/>
                            <path d="M80.2,62.4v-30c0-12.7-10.4-23-23-23H37.4c-12.7,0-23,10.3-23,23v0.9c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8
v-0.9c0-8.5,6.9-15.4,15.4-15.4h19.8c8.5,0,15.4,6.9,15.4,15.4v29.9c-8,1.6-14.3,8.2-15.2,16.4H37.4c-8.5,0-15.4-6.9-15.4-15.4
c0-2.1-1.7-3.8-3.8-3.8s-3.8,1.7-3.8,3.8c0,12.7,10.3,23,23,23h19.8c0.2,0,0.4,0,0.6,0c2.3,7.9,9.6,13.7,18.2,13.7
c10.5,0,19-8.5,19-19C95.1,71.9,88.7,64.4,80.2,62.4z M86.5,85h-7.1v7.1c0,1.5-1.2,2.7-2.7,2.7S74,93.6,74,92.1V85h-7.1
c-0.5,0-0.8-0.1-1.2-0.3c-0.8-0.5-1.5-1.3-1.5-2.3c0-1.5,1.2-2.7,2.7-2.7h6.4H74V79v-6.4c0-1.5,1.2-2.7,2.7-2.7
c0.9,0,1.6,0.5,2.2,1.1c0.3,0.5,0.5,0.9,0.5,1.6v7.1h7.1c1.5,0,2.7,1.2,2.7,2.7S87.9,85,86.5,85z"/>
                        </g>
                    </svg>
                    <h4 className="fruit__title">Create New Intake</h4>
                </Link>

                {
                    (intakes[0] === "start")

                        ? <Charging />
                        : (intakes.length === 0)
                            ? <div className="boton-intake">
                                <p className="text-center">No intakes</p>
                                <Link to="/newintake" className="mt-1">
                                    <svg viewBox="0 0 200 200">
                                        <polygon points="180.1,91.7 108.3,91.7 108.3,19.9 91.7,19.9 91.7,91.7 19.9,91.7 19.9,108.3 91.7,108.3 91.7,180.1 108.3,180.1 108.3,108.3 180.1,108.3 " />
                                    </svg>
                                </Link>
                            </div>
                            :
                            <div className="intake__list">
                                {
                                    intakes.map(info => (
                                        <div key={info.id} className="intake__container">

                                            <Link to={`/new-prereport/${info.id}`} className="intake__card mb-1">
                                                <div className="grid">
                                                    <div className="intake__left span-6">
                                                        <strong>{info.pallet}</strong>
                                                        <p>{info.product}</p>
                                                    </div>
                                                    <div className="intake__right span-6">
                                                        <p>{info.supplier}</p>
                                                        <p>{info.format}</p>
                                                        <p>{info.total_pallets}</p>
                                                        <p>{info.total_boxes}</p>
                                                        <p>{info.transport}</p>

                                                    </div>
                                                </div>
                                            </Link>
                                            <button
                                                className="remove-circle"
                                                onClick={() => handleRemove(info.id)}>
                                                <svg version="1.1" viewBox="0 0 200 200">
                                                    <polygon points="194.7,17 183,5.3 100,88.2 17,5.3 5.3,17 88.2,100 5.3,183 17,194.7 100,111.8 183,194.7 194.7,183 111.8,100 " />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>


                }

            </main>

        </div>
    )
}
