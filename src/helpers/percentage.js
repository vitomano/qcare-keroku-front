//format  -  weight 10  -  valor

import { valorPallgrow } from "./eliminarEs"

export function percentage( form, weig, fru ){

    const total = (Math.round(((((weig/10)*valorPallgrow(fru))/form)*100) * 10) / 10)
    // const total = ((((((weig/10)*valorPallgrow(fru))/form)*100) * 10) / 10).toFixed(2)

    if(total === Infinity){
        return "--"
    } else if (total.toString() === "0.00"){
        return `0%`
    } else if (total){
        return `${total}%`
    } else {
        return "0%"
    }
}
