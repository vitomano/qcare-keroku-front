import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom'
import qcareApi from '../../api/qcareApi'
import { dateFormat } from '../../helpers/dateFormat'
import { AccordeonLife } from '../ui/AccordeonLife'
import { ActiveBtn } from '../ui/ActiveBtn'
import { ModalDay } from '../ui/ModalDay'
import { ModalConfirmation } from '../ui/ModalConfirmation';
import toast from 'react-hot-toast';

export const SingleLifeTest = ({ history }) => {

    const { id } = useParams()
    const [mainData, setMainData] = useState()
    const [tests, setTests] = useState([])
    const [date, setDate] = useState()
    const [grower, setGrower] = useState()
    const [status, setStatus] = useState(true)
    const [reload, setReload] = useState(false)
    const [score, setScore] = useState("0")

    const [loo, setLoo] = useState(false)


    /* Modal */
    const [openModalDay, setOpenModalDay] = useState(false)
    const [openConfirmation, setOpenConfirmation] = useState(false)


    useEffect(() => {
        const fetchLifeTest = async () => {

            try {
                const { data } = await qcareApi.get(`/life-test/${id}`)

                setMainData(data.singleLife.reportId?.mainData)
                setTests(data.singleLife.test)
                setGrower(data.singleLife.grower)
                setDate(data.singleLife.date)
                setStatus(data.singleLife.status)
                setScore(data.singleLife.score || "0")
            } catch (error) {
                console.log(error)
            }
        };

        fetchLifeTest()

    }, [id, reload])

    const reloaded = () => setReload(!reload)


    const updateStatus = async () => {
        await qcareApi.put(`/life-test/status/${id}`)
        reloaded()
    };

    const removeLife = async () => {
        setLoo(true)
        try {
            await qcareApi.get(`/life-test/remove-life/${id}`)
            history.push('/life')
            toast.success('Life test has been removed')
            setOpenConfirmation(false)
            setLoo(false)

        } catch (error) {
            console.log(error)
            setOpenConfirmation(false)
            setLoo(false)
            toast.error('Something went wrong')
        }
    };

    return (
        <div className="content content-flex">

            <main className="container lifetest">

                {
                    openModalDay &&
                    <ModalDay
                        setOpenModalDay={setOpenModalDay}
                        lifeTestId={id}
                        reload={reload}
                        reloaded={reloaded}
                        dayNum={tests.length + 1 || 0}
                    />
                }

                {
                    openConfirmation &&
                    <ModalConfirmation
                        msg="Are you sure you want to remove this Shel Life Test?"
                        closeConfirmation={setOpenConfirmation}
                        action={(removeLife)}
                    />
                }

                {
                    loo
                        ?
                        <div>
                            <div className="loading">Loading&#8230;</div>
                            <p style={{ marginTop: "70px" }}>Uploading</p>
                        </div>
                        :
                        <>
                            <div className='flex-space-between mb-2'>
                                <h2 className="main-title">Shel Life Test</h2>
                                <button
                                    onClick={updateStatus}
                                >
                                    <ActiveBtn status={status} test={tests} />
                                </button>
                            </div>

                            {
                                mainData &&
                                <div className='card-life mb-2'>
                                    <div className='flex-space-between mb-05'>
                                        <h2 className="main-title">{mainData.pallet_ref || '--'}</h2>
                                        <div className={`life-score score-${score}`}>
                                            <p>{score || '0'} / 8</p>
                                        </div>
                                    </div>
                                    <div className='main-info__item'>
                                        <p className='bold'>Grower</p>
                                        <p>{grower || mainData.grower || '--'}</p>
                                    </div>
                                    <div className='main-info__item'>
                                        <p className='bold'>GGN</p>
                                        <p>{mainData.gln_ggn || '--'}</p>
                                    </div>
                                    <div className='main-info__item'>
                                        <p className='bold'>Product</p>
                                        <p>{mainData.product || '--'}</p>
                                    </div>
                                    <div className='main-info__item'>
                                        <p className='bold'>Date</p>
                                        <p>{dateFormat(date) || '--'}</p>
                                    </div>
                                    <div className='main-info__item'>
                                        <p className='bold'>Variety</p>
                                        <p>{mainData.variety || '--'}</p>
                                    </div>
                                </div>
                            }
                            <div className="pallets-container life-columns">
                                {
                                    tests.length > 0 &&
                                    tests.map((test, index) => (
                                        <AccordeonLife
                                            key={uuidv4()}
                                            reloaded={reloaded}
                                            lifeId={id}
                                            index={index}
                                            {...test}
                                        />
                                    ))
                                }
                            </div>
                            {
                                tests.length < 7 &&
                                <button
                                    className="btn-add-day mb-5"
                                    onClick={() => setOpenModalDay(true)}
                                >
                                    <img src="/assets/img/new-day.svg" alt="data" />
                                    <p>Day {tests.length + 1}</p>
                                </button>
                            }

                            <button
                                onClick={() => setOpenConfirmation(true)}
                                className='remove-life'>Remove Life Test</button>
                        </>

                }


            </main>
        </div>
    )
}
