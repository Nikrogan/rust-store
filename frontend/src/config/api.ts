import axios from 'axios';


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_CONFIG,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        key: 'Access-Control-Allow-Origin',
        value: process.env.NEXT_PUBLIC_APP_URL,
    },
}
)