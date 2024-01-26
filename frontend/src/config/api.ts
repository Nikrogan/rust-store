import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://turringrust.ru/api/v1/',
    withCredentials: true,
    headers: {
        key: 'Access-Control-Allow-Origin',
        value: process.env.NEXT_PUBLIC_APP_URL,
    },
}
)