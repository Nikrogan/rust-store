import { getCookie } from '@/cookie';
import axios from 'axios';


export const api = axios.create({
        baseURL: process.env.API_CONFIG,
    }
)