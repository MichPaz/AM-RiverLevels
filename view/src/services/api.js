import axios from 'axios';

let api = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    headers: {
        common: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    }
})

export default api;