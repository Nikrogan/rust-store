import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://localhost:5000/api/v1/',
    withCredentials: true
}
)