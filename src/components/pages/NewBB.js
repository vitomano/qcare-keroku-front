import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { MainForm } from './Inputs/MainForm';
import { Pallet } from './Pallet';
import { Spinner } from '../ui/Spinner';
import { Charging } from '../ui/Charging';
import { palletData } from '../../data/pallet';
import qcareApi from '../../api/qcareApi';


export const NewBB = ({ history }) => {

    const { id } = useParams()
    const intakes = ["start"]
    const [pallets, setPallets] = useState([])
    const samples = 1;
    const [fruit, setFruit] = useState(id || "other")
    const [loo, setLoo] = useState(false)

    const comments = `The results contained within this report were obtained from random samples taken throughout the delivery. Progressive defects that are present may exceed the eventual defect level specified. Sampling does not represents 100% of the real Quality and condition of the fruit and it is only an approximation to reality.
    
If, or on further processing, the product requires further selection to meet the customer specification, you will be informed of any losses in due course. However, if you would like the product returned or dealt with in any other manner please contact the relevant commercial contact within Growers Packers.`;

    useEffect(() => {

        setPallets([])

        for (let i = 0; i < (pallets.length || 0); i++) {
            setPallets(c => [...c, palletData(fruit, samples)])
        }

    }, [fruit])



    //Enviar reporte
    const handleSend = async () => {

        const mainForm = document.getElementById('main-form')
        const commentsForm = document.getElementById('comments').value

        const formatGrVal = (document.getElementById('formatGr').value).trim()
        const kilos = (document.getElementById('kilos').value).trim()
        const weightExist = pallets.map(v => v.pallgrow[0].valor.trim())

        if (weightExist.includes("")) { return toast.error(`"Weight 10 Fruits" value is missing`) }
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

        const newScore = () => {
            const scores = pallets.map(sc => Number(sc.score || 0))
            const scoreFiltered = scores.filter(oneScore => oneScore > 0) || [0]

            if (scoreFiltered.length === 0) return 0
            else { return Math.min(...scoreFiltered) || 0 }
        };


        try {

            let mainData = {}
            for (let item of mainForm) {
                mainData[item.name] = item.value;
            }

            await qcareApi.post(`/report/report`, { mainData, fruit, commentsForm, averageScore: newScore() || 0 })
                .then(async (res) => {

                    const idr = res.data.rid

                    for (let i = 0; i < pallets.length; i++) {

                        const details = {
                            labels: pallets[i].labels.filter(p => p.check === true),
                            appareance: pallets[i].appareance.filter(p => p.check === true),
                            pallgrow: pallets[i].pallgrow.filter(p => p.check === true)
                        }

                        const formData = {
                            rid: idr,
                            palletId: pallets[i]?.id,
                            scoreVal: pallets[i]?.score,
                            details: JSON.stringify(details),
                            addGrower: pallets[i]?.newGrower || null
                        }

                        await qcareApi.post('/report/upload-pallets', formData)
                    }

                    return idr
                })

                .then(async (respo) => {

                    const savePalletInfo = async () => {

                        let aids = pallets.map(a => a.id)

                        for (const idd of aids) {

                            const sinPall = pallets.find(pall => pall.id === idd)
                            const formData = new FormData();

                            for (const img of sinPall.images) {
                                formData.append('uploady', img)
                            }

                            formData.append('rid', respo)
                            formData.append('palletId', idd)

                            await qcareApi.post('/report/upload-images', formData)
                        }
                    };

                    const saveLifeTest = async () => {
                        const allGrowers = pallets.filter(p => p.newGrower).map(p => { return { grower: p.newGrower.grower_variety, score: p.score } })
                        const growers = allGrowers.length > 0 ? allGrowers : [{ grower: (mainForm?.grower?.value || "--"), score: newScore().toString() }]

                        for (const gro of growers) {
                            await qcareApi.post('/life-test/create-life-test', {
                                reportId: respo,
                                grower: gro.grower,
                                score: gro.score,
                                palletRef: mainForm?.pallet_ref?.value || "--" })
                        }
                    }

                    await Promise.all([savePalletInfo(), saveLifeTest()])
                })

            setLoo(false)
            history.push('/')

        } catch (error) {
            console.log(error)

            setLoo(false)
            history.push('/')
        }
    }

    const handleAddNew = () => {
        setPallets(c => [...c, palletData(fruit, samples)])
    }

    const handleRemovaPallet = (aid) => {
        const newPallets = pallets.filter(pall => pall.id !== aid)
        setPallets(newPallets)
    }

    const handleFruit = (e) => {
        setFruit(e.target.value)
    }

    
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
                            <h2 className="main-title mb-2">Create report</h2>

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
                                                <Pallet
                                                    intakes={intakes}
                                                    pallets={pallets}
                                                    pallet={pall}
                                                    id={pall.id}
                                                    score={pall.score}
                                                    handleRemovaPallet={handleRemovaPallet}
                                                    setPallets={setPallets}
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

                            <form className="pallet-comments mb-1">
                                <div className="mb-05">
                                    <p>Comments</p>
                                    <textarea name="comments" id="comments" cols="30" rows="5" defaultValue={comments} />
                                </div>

                            </form>

                            <button
                                onClick={handleSend}
                                className="btn-primary btn-block mt-1"

                            >Send Report</button>
                        </div>
                }
            </main>

        </div >
    )
}
