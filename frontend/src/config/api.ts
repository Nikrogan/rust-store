import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://turringrust.ru/api/v1/',
}
)