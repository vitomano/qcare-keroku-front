import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { MainForm } from './Inputs/MainForm';
import { Spinner } from '../ui/Spinner';
import { Charging } from '../ui/Charging';
import { fruitType } from '../../helpers/fruitType';
import { totalSamples } from '../../helpers/formatSplit';
import qcareApi from '../../api/qcareApi';
import { palletPrereport } from '../../data/prereports';
import { PalletPreReport } from './PalletPreReport';


export const NewPreReport = ({ history }) => {

    const { id } = useParams()
    const [intakes, setIntakes] = useState({})
    const [totalPallets, setTotalPallets] = useState(0)
    const [pallets, setPallets] = useState([])
    const [fruit, setFruit] = useState("other")
    const [samples, setSamples] = useState(1);
    const [startDate, setStartDate] = useState(null)

    const [loo, setLoo] = useState(false)

    useEffect(() => {
        setStartDate(new Date())
    }, [])


    useEffect(() => {

        async function getIntakes() {

            const { data } = await qcareApi.get(`/prereport/new-report/${id}`)

            console.log(data)

            setSamples(totalSamples(data.intakeReport.data.format, data.intakeReport.data?.total_boxes) || 1)
            setFruit(fruitType(data.intakeReport.data?.product) || "other")
            setTotalPallets(parseInt(data.intakeReport.data?.total_pallets) || 0)
            setIntakes(data.intakeReport.data || {})
        }
        getIntakes()
    }, [id])

    useEffect(() => {

        setPallets([])

        for (let i = 0; i < (totalPallets || 0); i++) {
            setPallets(c => [...c, palletPrereport()])
        }

    }, [totalPallets, fruit, samples])



    //Enviar reporte
    const handleSend = async () => {

        // return console.log(pallets)

        const mainForm = document.getElementById('main-form')

        const formatGrVal = (document.getElementById('formatGr').value).trim()
        const kilos = (document.getElementById('kilos').value).trim()

        if (formatGrVal === "" || formatGrVal === "0" || formatGrVal === 0) {
            document.getElementById('formatGr').scrollIntoView();
            return toast.error(`"Format gr" value is missing`)
        }
        if (kilos === "" || kilos === "0") {
            document.getElementById('kilos').scrollIntoView();
            return toast.error(`"Kilos" value is missing`)
        }

        setLoo(true)

        const token = localStorage.getItem('token')

        if (!token) {
            setLoo(false)
            return
        }

        const newAverage = (item) => {
            let average = null
            if (item === "score") { average = pallets.map(sc => Number(sc.score || 0)) }
            if (item === "grade") { average = pallets.map(sc => Number(sc.qcgrade || 0)) }
            if (item === "action") { average = pallets.map(sc => Number(sc.qcaction || 0)) }

            const averageFiltered = average.filter(oneScore => oneScore > 0) || [0]

            if (averageFiltered.length === 0) return 0
            else { return Math.min(...averageFiltered) || 0 }
        }


        try {

            let mainData = {}
            for (let item of mainForm) {
                mainData[item.name] = item.value;
            }

            let newPallets = []

            for (let grower of pallets) {

                const details = {
                    labels: (grower.labels.filter(p => p.check === true)).map(lab => { delete lab.check; return lab }),
                    appareance: (grower.appareance.filter(p => p.check === true)).map(app => { delete app.check; return app }),
                }


                newPallets.push({
                    pid: grower.id,
                    details,
                    score: grower.score,
                    grade: grower.qcgrade,
                    action: grower.qcaction,
                    images:[],
                    addGrower: grower?.newGrower || null,
                })
            }


            await qcareApi.post(`/prereport/main-prereport`, {
                mainData,
                fruit,
                pid: id,
                averageScore: newAverage('score') || 0,
                averageGrade: newAverage('grade') || 0,
                averageAction: newAverage('action') || 0,
                startDate: startDate,
                endDate: new Date(),
                pallets: newPallets
            })

            .then(async (res) => {

                const preId = res.data.preId

                for (const pall of pallets) {

                    if(pall.images.length === 0) return 
                    const formData = new FormData();

                    for (const img of pall.images) {
                        formData.append('uploady', img)
                    }

                    formData.append('preId', preId)
                    formData.append('palletId', pall.id)

                    await qcareApi.post('/prereport/images-prereport', formData)
                }

            })

            toast.success('Pre Report sent successfully')

        } catch (error) {
            console.log(error)
        } finally {
            setLoo(false)
            history.push('/prereports')
        }
    }

    const handleAddNew = () => {
        setPallets(c => [...c, palletPrereport()])
    }

    const handleRemovaPallet = (aid) => {
        const newPallets = pallets.filter(pall => pall.id !== aid)
        setPallets(newPallets)
    }

    const handleFruit = (e) => {
        setFruit(e.target.value)
    }

    // ----------------- Add Grower -----------------

    const normalScore = () => {
        const newPallets = pallets.map(pal => {

            delete pal.newGrower
            return pal
        })
        setPallets(newPallets)
        // setExistGrower(false)
    };

    const addGrower = () => {

        const newPallets = pallets.map(pal => {

            return {
                ...pal,
                score: pal.score,
                // score: pallet.score,
                newGrower: {
                    grower_variety: "",
                    boxes: 0,
                }
            }
        })
        setPallets(newPallets)
        // setExistGrower(true)

    };

    // ----------------- Add Grower -----------------

    // const handleSelect = (e, general) => {
    //     if (general === "grade") setGeneralGrade(e.target.value)
    //     if (general === "action") setGeneralAction(e.target.value)
    // };


    return (
        <div className="content intake">

            <main className="container">
                {
                    (loo) && <Spinner motive="Uploading..." />
                }

                {
                    Object.keys(intakes).length < 0
                        ? <Charging />
                        : <div className="intake__fullreport">
                            <h2 className="main-title mb-2">Pre Report</h2>

                            {
                                Object.keys(intakes).length > 0 &&
                                <div className='mb-3'>
                                    <MainForm
                                        intakes={intakes}
                                        pallets={pallets}
                                        handleFruit={handleFruit}
                                        fruit={fruit}
                                        finalSamples={samples}
                                    />
                                    <div className="grid intake__input">
                                        <label className="span-5 ">Fruit to report</label>

                                        <div className="span-7 select-input">
                                            <select onChange={handleFruit} value={fruit}>
                                                <option value="blueberries">Blueberries</option>
                                                <option value="raspberries">Raspberries</option>
                                                <option value="strawberries">Strawberries</option>
                                                <option value="blackberries">Blackberries</option>
                                                <option value="kiwiberries">Kiwiberries</option>
                                                <option value="pears">Pears</option>
                                                <option value="apples">Apples</option>
                                                <option value="cherries">Cherries</option>
                                                <option value="figs">Figs</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            }

                            {
                                (pallets.length > 0)
                                    ? pallets.map((pall) => {

                                        return (
                                            <div key={uuidv4()}>
                                                <PalletPreReport
                                                    intakes={intakes}
                                                    pallets={pallets}
                                                    pallet={pall}
                                                    id={pall.id}
                                                    score={pall.score}
                                                    handleRemovaPallet={handleRemovaPallet}
                                                    setPallets={setPallets}
                                                    addGrower={addGrower}
                                                    normalScore={normalScore}
                                                />
                                            </div>
                                        )
                                    })

                                    : <p className="text-center bold">No pallets</p>

                            }

                            <div className="boton-intake mb-1 mt-2">
                                <p className="text-center font-small mb-05">Add Pallet</p>
                                <button
                                    onClick={handleAddNew}>
                                    <svg viewBox="0 0 200 200">
                                        <polygon points="180.1,91.7 108.3,91.7 108.3,19.9 91.7,19.9 91.7,91.7 19.9,91.7 19.9,108.3 91.7,108.3 91.7,180.1 108.3,180.1 108.3,108.3 180.1,108.3 " />
                                    </svg>
                                </button>
                            </div>

                            <button
                                onClick={handleSend}
                                className="btn-primary btn-block mt-1"

                            >Create Pre Report</button>
                        </div>
                }
            </main>

        </div >
    )
}
