import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import React from 'react'
import { major } from "../../data/major";
import { colorScorePdf } from "../../helpers/colorScore";
import { colorScorePdfOldReport } from "../../helpers/colorScoreOldReports";

import { itemValor, valorPallgrow } from "../../helpers/eliminarEs";
import { totalKilos } from "../../helpers/formatSplit";
import { percentage } from "../../helpers/percentage";
import { useOldDate } from "../../hooks/useOldDate";


export const DocuPdf = ({ allData }) => {

    const [fullData, toShare] = allData
    const { oldDate } = useOldDate(allData[0].date)

    const {
        // pallet_ref,
        product,
        format,
        supplier,
        grower,
        origin,
        gln_ggn,
        variety,
        total_boxes,
        total_pallets,
        quality,
        transport,
        purchase_order,
        delivery_note,
        warehouse,
        kilos,
        format_gr
    } = fullData.mainData

    const date = new Date(fullData.date).toLocaleDateString()
    const pallets = fullData.pallets
    const formatGr = fullData.formatGr
    const fruit = fullData.fruit || "other"

    const porColor = (name, formatGr, weight_format, valor) => {
        if (major(fruit).includes(name)) {
            return <Text style={[styles.por, styles.porRed]}>{percentage(formatGr, weight_format, valor)}</Text>
        } else {
            return <Text style={[styles.por, styles.porOrange]}>{percentage(formatGr, weight_format, valor)}</Text>
        }
    }

    return (
        <Document>

            <Page
                size="A4"
                style={styles.pageFormat}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <View style={{ width: "60px" }}></View>

                    <Text style={{ color: "#26633C", fontSize: "20px", textAlign: "center" }}>
                        Quality Control - Report
                    </Text>
                    <Image
                        src="../../assets/img/qc-logo-color.png"
                        alt="random image"
                        style={{ width: "60px", height: "auto" }}
                    />
                </View>

                {/* ------------------------------- PARTICULARS ------------------------------- */}

                <Text style={styles.h2}>PARTICULARS</Text>

                <View style={styles.list}>

                    <View style={{ width: "50%" }}>
                        <View style={styles.mb}>
                            <Text style={styles.title}>Date of inspection</Text>
                            <Text style={styles.text}>{date || "--"}</Text>
                        </View>

                        {
                            toShare &&
                            <View style={styles.mb}>
                                <Text style={styles.title}>Supplier</Text>
                                <Text style={styles.text}>{supplier || "--"}</Text>
                            </View>
                        }

                        <View style={styles.mb}>
                            <Text style={styles.title}>Warehouse</Text>
                            <Text style={styles.text}>{warehouse || "--"}</Text>
                        </View>
                    </View>

                    <View style={{ width: "50%" }}>
                        <View style={styles.mb}>
                            <Text style={styles.title}>Transporteur</Text>
                            <Text style={styles.text}>{transport || "--"}</Text>
                        </View>

                        {
                            toShare &&
                            <View style={styles.mb}>
                                <Text style={styles.title}>Grower</Text>
                                <Text style={styles.text}>{grower || "--"}</Text>
                            </View>
                        }

                    </View>
                </View>

                {/* ------------------------------- SUMMARY ------------------------------- */}

                <Text style={styles.h2}>SUMMARY</Text>

                <View style={styles.list}>

                    <View style={{ width: "50%" }}>
                        {/* <View style={styles.mb}>
                            <Text style={styles.title}>Pallet reference</Text>
                            <Text style={styles.text}>{pallet_ref || "--"}</Text>
                        </View> */}

                        <View style={styles.mb}>
                            <Text style={styles.title}>Product</Text>
                            <Text style={styles.text}>{product || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Variety</Text>
                            <Text style={styles.text}>{variety || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Format</Text>
                            <Text style={styles.text}>{format || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Format Gr</Text>
                            <Text style={styles.text}>{format_gr || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Origin</Text>
                            <Text style={styles.text}>{origin || "--"}</Text>
                        </View>

                        {
                            toShare &&
                            <View style={styles.mb}>
                                <Text style={styles.title}>GGN/GLN/CoC</Text>
                                <Text style={styles.text}>{gln_ggn || "--"}</Text>
                            </View>
                        }

                    </View>

                    <View style={{ width: "50%" }}>
                        <View style={styles.mb}>
                            <Text style={styles.title}>Total Kilos</Text>
                            <Text style={styles.text}>{kilos || totalKilos(format, total_boxes) || "--"} kg</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Total Boxes</Text>
                            <Text style={styles.text}>{total_boxes || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Total Pallets</Text>
                            <Text style={styles.text}>{total_pallets || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Category</Text>
                            <Text style={styles.text}>{quality || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Purchase Order</Text>
                            <Text style={styles.text}>{purchase_order || "--"}</Text>
                        </View>

                        <View style={styles.mb}>
                            <Text style={styles.title}>Delivery Note</Text>
                            <Text style={styles.text}>{delivery_note || "--"}</Text>
                        </View>

                    </View>
                </View>

                {/* ------------------------------- END ------------------------------- */}


                <View style={styles.list}>
                    {
                        pallets.length > 0
                            ?
                            pallets.map((onePallet, i) => (
                                <View key={i} style={{ width: "50%", display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                    <Text style={{ marginRight: 10, fontSize: "14px" }}>Pallet {i + 1}</Text>
                                    {
                                        oldDate
                                            ? colorScorePdfOldReport(onePallet.score)
                                            : colorScorePdf(onePallet.score)
                                    }
                                </View>
                            ))
                            :
                            <Text>No pallets</Text>
                    }
                </View>

                <Text style={styles.h2}>COMMENTS</Text>
                <View style={styles.comments}>
                    <Text>{fullData.comments}</Text>
                </View>


            </Page>


            {
                pallets.length > 0 &&
                pallets.map((onePallet, i) => {

                    const labels = onePallet.details.labels || []
                    const labelsPre = onePallet.prereport.details.labels || []
                    const appareance = onePallet.details.appareance.filter(app => app.tipe !== "arrays") || []
                    const appareance2 = onePallet.details.appareance.filter(app => app.tipe === "arrays") || []
                    const appareance2Pre = onePallet.prereport.details.appareance || []

                    const pallgrow = onePallet.details.pallgrow

                    const labelsFinal = [...labels, ...labelsPre]
                    const appFinal = [...appareance, ...appareance2Pre]

                    console.log(appFinal)

                    const weight_format = parseInt((onePallet.details.pallgrow.find(app => app.name === "weight_10"))?.valor) || 0

                    return (

                        <Page key={i} size="A4" style={styles.pageFormat}>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ marginRight: 5, fontSize: "16px", color: "#26633C", fontWeight: "bold" }}>Pallet {i + 1}</Text>

                                {
                                    !onePallet.addGrower
                                        ? oldDate
                                            ? colorScorePdfOldReport(onePallet.score)
                                            : colorScorePdf(onePallet.score)
                                        :
                                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ ...styles.text, marginTop: '3px', fontSize: "10px", color: "#adadad" }}>Grower / Variety: </Text>
                                            <Text style={{ ...styles.text, marginRight: '10px', marginTop: '3px' }}>{onePallet.addGrower.grower_variety}</Text>
                                            <View style={[styles.boxes, { backgroundColor: "#ddd" }]}>
                                                <Text style={{ ...styles.text, ...styles.bold, marginRight: '5px', fontWeight: 'bold' }}>{onePallet.addGrower.boxes} boxes</Text>
                                            </View>
                                            {colorScorePdf(onePallet.score)}
                                        </View>

                                }
                            </View>

                            <Text style={styles.h2}>Labels</Text>
                            <View style={styles.listFlex}>
                                {
                                    labelsFinal.map((label, i) => (
                                        <View key={i} style={styles.item}>
                                            <Text style={[styles.text, styles.bold]}>{label.label}</Text>
                                            <Text style={styles.title}>{itemValor(label.valor, label.tipe)}</Text>
                                        </View>
                                    ))
                                }
                            </View>

                            <Text style={styles.h2}>Appareance</Text>
                            <View style={styles.listFlex}>
                                {
                                    appFinal.map((appa, i) => (
                                        <View key={i} style={styles.item}>
                                            <Text style={[styles.text, styles.bold]}>{appa.label}</Text>
                                            <Text style={styles.title}>{itemValor(appa.valor)}</Text>
                                        </View>
                                    ))
                                }
                                {
                                    appareance2.map((appa2, i) => (
                                        <View key={i} style={styles.item}>
                                            <Text style={[styles.text, styles.bold]}>{appa2.label}</Text>

                                            {

                                                (appa2.name === undefined)
                                                    ?
                                                    <View style={styles.percentage}>{

                                                        appa2.arrays.map((t, i) => (
                                                            <View key={i} style={styles.value}>
                                                                <Text>{t.valor || "--"}</Text>
                                                            </View>
                                                        ))
                                                    }</View>
                                                    :
                                                    <View style={styles.percentage}>{

                                                        appa2.valor.map((t, i) => (
                                                            <View key={i} style={styles.value}>
                                                                <Text>{t || "--"}</Text>
                                                            </View>
                                                        )
                                                        )
                                                    }</View>
                                            }



                                        </View>
                                    ))
                                }
                            </View>
                            <Text style={styles.h2}>PallGrow</Text>
                            <View style={styles.listFlex}>
                                {
                                    pallgrow.map((pall, i) => (
                                        <View key={i} style={styles.item}>
                                            <Text style={[styles.text, styles.bold]}>{pall.label}</Text>
                                            <View style={styles.percentage}>
                                                <Text style={styles.title}>{valorPallgrow(pall.valor)}{pall.name === 'weight_10' && "g"}</Text>
                                                {
                                                    (pall.name !== 'weight_10') &&
                                                    porColor(pall.name, formatGr, weight_format, pall.valor)
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>

                            <Text style={{ marginTop: 15, marginBottom: 10, fontSize: "16px", fontWeight: "bold" }}>IMAGES</Text>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between"
                            }}>
                                {
                                    onePallet.images.length > 0
                                        ?
                                        onePallet.images.map((img, i) => (
                                            <View key={i} style={{ width: "49%", maxHeight: "250px", marginBottom: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Image
                                                    src={img.imgURL || img.imgURL_low}
                                                    alt={`img-${i}`}
                                                    style={{ width: "100%", objectFit: 'contain' }}
                                                />
                                            </View>
                                        ))
                                        :
                                        <Text>No Images</Text>
                                }
                            </View>
                        </Page>
                    )
                })
            }
        </Document>
    )

}

const styles = StyleSheet.create({
    mb: {
        marginBottom: 4
    },
    pageFormat: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 45,
        paddingVertical: 40,
    },
    title: {
        color: "gray",
        fontSize: "12px",
        lineHeight: "1.3px"
    },
    text: {
        fontSize: "12px",
        lineHeight: "1.3px"
    },
    h2: {
        fontSize: "14px",
        marginBottom: 7,
        fontWeight: "bold",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 22,
    },
    percentage: {
        display: "flex",
        flexDirection: "row",
    },
    listFlex: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1,
    },
    bold: {
        fontWeight: "bold",
    },
    comments: {
        backgroundColor: "#efefef",
        minHeight: "80px",
        borderRadius: 5,
        padding: 8,
        fontSize: "10.5px",
        lineHeight: "1.6px",
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "45%",
    },
    value: {
        color: "gray",
        fontSize: "12px",
        // width: "20px",
        marginLeft: 15,
    },
    por: {
        width: "50px",
        fontSize: "12px",
        textAlign: "right"
    },
    porRed: {
        color: "red",
    },
    porOrange: {
        color: "orange",
    },

    boxes: {
        minWidth: "70px",
        minHeight: "22px",
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 50,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: '5px'
    },

});