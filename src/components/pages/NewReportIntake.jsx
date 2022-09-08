import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router'
import { Pallet } from './Pallet';
import { Spinner } from '../ui/Spinner';
import { Charging } from '../ui/Charging';
import { palletData } from '../../data/pallet';
import { totalSamples } from '../../helpers/formatSplit';
import qcareApi from '../../api/qcareApi';
import { ReportMain } from './ReportData/ReportMain';


export const NewReportIntake = ({ history }) => {

    const { id } = useParams()
    const [mainData, setMainData] = useState({})
    const [prereports, setPrereports] = useState([])
    const [pallets, setPallets] = useState([])
    const [fruit, setFruit] = useState("other")
    const [samples, setSamples] = useState(1);

    const [loo, setLoo] = useState(false)

    const comments = `The results contained within this report were obtained from random samples taken throughout the delivery. Progressive defects that are present may exceed the eventual defect level specified. Sampling does not represents 100% of the real Quality and condition of the fruit and it is only an approximation to reality.
    
If, or on further processing, the product requires further selection to meet the customer specification, you will be informed of any losses in due course. However, if you would like the product returned or dealt with in any other manner please contact the relevant commercial contact within Growers Packers.`;

    useEffect(() => {

        async function getIntakes() {

            const { data } = await qcareApi.get(`/report/new-report/${id}`)

            setSamples(totalSamples(data.intakeReport.mainData?.format, data.intakeReport.mainData?.total_boxes) || 1)
            setFruit(data.intakeReport.fruit || "other")
            setMainData(data.intakeReport.mainData || {})
            setPrereports(data.intakeReport.pallets || {})
        }
        getIntakes()
    }, [id])

    useEffect(() => {

        setPallets([])

        for (let pall of prereports) {
            const newPrereport = {
                action: pall.action || "0",
                grade: pall.grade || "0",
                score: pall.score || "0",
                details: pall.details || [],
                images: pall.images || [],
            }

            setPallets(c => [...c, { ...palletData(fruit, samples), prereport: newPrereport, addGrower: pall.addGrower }])
        }

    }, [prereports, fruit, samples])



    //Enviar reporte
    const handleSend = async () => {

        const commentsForm = document.getElementById('comments').value
        const weightExist = pallets.map(v => v.pallgrow[0].valor.trim())
        if (weightExist.includes("")) { return toast.error(`"Weight 10 Fruits" value is missing`) }

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

        // return console.log(mainData)
        // return console.log(pallets)

        try {

            let newPallets = []

            // for (let grower of pallets) {

            //     const details = {
            //         appareance: (grower.appareance.filter(a => a.check === true)),
            //         pallgrow: (grower.pallgrow.filter(p => p.check === true)),
            //     }

            //     newPallets.push({
            //         pid: grower.id,
            //         prereport: grower.prereport,
            //         details,
            //         score: grower.score,
            //         images: [],
            //         addGrower: grower?.newGrower || null,
            //     })
            // }

            for(let i = 0; i < pallets.length; i++){
                
                const details = {
                    appareance: (pallets[i].appareance.filter(a => a.check === true)),
                    pallgrow: (pallets[i].pallgrow.filter(p => p.check === true)),
                }

                newPallets.push({
                    pid: pallets[i].id,
                    prereport: pallets[i].prereport,
                    details,
                    score: pallets[i].score,
                    images: [],
                    addGrower: pallets[i].addGrower || null,
                })
            }

            await qcareApi.post(`/report/report`, {
                mainData,
                fruit,
                pid: id,
                averageScore: newScore() || 0,
                pallets: newPallets,
                commentsForm,
                formatGr: Number(mainData.format_gr) || 0
            })

                .then(async (res) => {

                    const savePalletInfo = async () => {

                        const repId = res.data.rid

                        for (const pall of pallets) {

                            // if (pall.images.length === 0) return
                            const formData = new FormData();

                            for (const img of pall.images) {
                                formData.append('uploady', img)
                            }

                            formData.append('repId', repId)
                            formData.append('palletId', pall.id)

                            await qcareApi.post('/report/upload-images', formData)
                        }
                    };

                    const saveLifeTest = async () => {
                        const allGrowers = pallets.filter(p => p.addGrower).map(p => { return { grower: p.addGrower.grower_variety, score: p.score } })
                        const growers = allGrowers.length > 0 ? allGrowers : [{ grower: (mainData?.grower || "--"), score: newScore().toString() }]

                        for (const gro of growers) {
                            await qcareApi.post('/life-test/create-life-test', {
                                reportId: res.data.rid,
                                grower: gro.grower,
                                score: gro.score,
                                palletRef: mainData?.pallet_ref || "--"
                            })
                        }
                    }

                    await Promise.all([savePalletInfo(), saveLifeTest()])

                })
            toast.success('Report sent successfully')
            console.log('OK')

        } catch (error) {
            console.log(error)
        }finally {
            setLoo(false)
            history.push('/')
        }
    }


    console.log(pallets)


    return (
        <div className="content intake">

            <main className="container">
                {
                    (loo) && <Spinner motive="Uploading..." />
                }

                {
                    pallets.length === 0
                        ? <Charging />
                        : <div className="intake__fullreport">
                            <h2 className="main-title mb-2">Report</h2>

                            {
                                Object.keys(mainData).length > 0 &&
                                <div className='mb-3'>
                                    <ReportMain
                                        mainData={mainData}
                                    />

                                </div>
                            }

                            {
                                (pallets.length > 0)
                                    ? pallets.map((pall, i) => {

                                        return (
                                            <div key={uuidv4()}>
                                                <Pallet
                                                    intakes={mainData}
                                                    pallets={pallets}
                                                    pallet={pall}
                                                    id={pall.id}
                                                    score={pall.score}
                                                    setPallets={setPallets}
                                                    i={i}
                                                />
                                            </div>
                                        )
                                    })

                                    : <p className="text-center bold">No pallets</p>

                            }

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
