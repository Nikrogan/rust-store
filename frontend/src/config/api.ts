import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7208',
    headers: {
        'Content-Type': 'application/json', // Set the default content type for request headers
    },