import { v4 as uuidv4 } from 'uuid';


export const palletPrereport = () => {
    return {
        id: uuidv4(),
        score: "0",
        qcgrade: "0",
        qcaction: "0",
        images: [],
        labels: [
            { check: true, tipe: "checkbox", label: "Box Label", name: "box_label", valor: true },
            
            { check: true, tipe: "select", label: "EU Pallet", name: "eu_pallet", valor: "" },
            { check: true, tipe: "select", label: "Block Pallet", name: "block_pallet", valor: "" },

            { check: true, tipe: "checkbox", label: "Punnet Label", name: "punnet_label", valor: true },
            { check: true, tipe: "checkbox", label: "Name & Weight", name: "name_weight", valor: true },
            { check: true, tipe: "text", label: "L Code", name: "l_code", valor: "" },
            { check: true, tipe: "text", label: "T Code", name: "t_code", valor: "" },
            { check: true, tipe: "text", label: "EAN Code", name: "ean_code", valor: "" },
            { check: true, tipe: "text", label: "Variety", name: "variety", valor: "" },
    
        ],
        appareance: [
            { check: true, tipe: "range", label: "Pallet Integrity", name: "pallet_integrity", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "number", label: "Temperature C", name: "temperature_c", valor: "" },
        ],
      
    }
} 

