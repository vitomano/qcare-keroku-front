export function formatSplit(form = "0") {

    const num = (form?.split("*")[1])?.split("g")[0] || ""
    const total = parseInt(num) || ""

    if (total) {
        return total
    } else {
        return ""
    }
}

export function totalKilos(format = "0*0", totalBoxes = "0") {

    if (format.includes("*") && !isNaN(totalBoxes)) {

        let num1 = format.split('*')[0] || 0
        let num2 = (format.split('*')[1]).split('g')[0] || 0

        return ((num1 * num2 * totalBoxes) / 1000)
    } else { return 0 }
};

export function totalSamples(format = "0*0") {

    if ( format.includes("*") ) {
        let samples = format.split('*')[0] || 0

        if (samples > 1 && !isNaN(samples)) { return Number(samples) }
        else { return 1 }

    } else { return 1 }
};
// export function totalSamples(format = "0*0", totalBoxes = 0) {

//     if (format.includes("*") && !isNaN(totalBoxes)) {
//         let num1 = format.split('*')[0] || 0
//         let samples = Math.floor((totalBoxes * num1) * 0.01) || 0

//         if(samples > 1){ return samples }
//         else { return 1}

//     } else { return 1 }
// };