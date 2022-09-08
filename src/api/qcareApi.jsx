import axios from "axios";

// const baseURL = 'http://localhost:4000/api'
const baseURL = process.env.REACT_APP_API_URL


const qcareApi = axios.create({
    baseURL: baseURL
}) 

qcareApi.interceptors.request.use(

    async(config) => {
        const token = localStorage.getItem('token')

        if(token){
            config.headers['x-token'] = token;
        } 
        return config;
    }
);

export default qcareApi