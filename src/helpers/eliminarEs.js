import { colorEU } from "./colorEU";

export function tituloEs(texto) {
    let text = (texto.charAt(0).toUpperCase() + texto.slice(1)).normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    return text.split('_').join(' ');
}

export function valorEs(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


// Convierte Texto a formato name (ej: Hola Mundo => "hola_mundo")
export function inputJson(txt) {
    return txt.split(" ").join("_").toLowerCase()
}


// Convierte cualquier valor (string, number, boolean) a String y reemplaza vacio por "--"
export function itemValor(valor, tipe) {

    if (typeof valor === "boolean") {

        if (valor === true) { return "Yes" }
        else { return "No" }

    } 
    if(tipe === "select"){
        return colorEU(valor)
    }
    else {
        if (valor === "") { return "--" }
        else { return valor }
    }
}

export function valorPallgrow(valor) {

    if (Array.isArray(valor)) {

        let sum = 0;

        for (let i = 0; i < valor.length; i++) {
            if(!isNaN(valor[i])){
                sum += Number(valor[i]);
            } else sum += 0
        }
        
        if(sum/valor.length === 0){return 0}
        else {return (sum / valor.length).toFixed(2)}

    }

    else {
        if (isNaN(valor)) { return 0 }
        else { return valor }
    }
}


export function capitalize(text) {
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}


// Solo numeros en input de tipo "number"
export const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
