import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7208',
    headers: {
        'Content-Type': 'application/json', // Set the default content type for request headers
    },
})

//export const webSocketAuth = new WebSocket("ws://localhost:7208/api/User/steam-auth");
export const webSocketAuth = new WebSocket("wss://localhost:7208/ws");

webSocketAuth.onopen = () => {
    webSocketAuth.send("hello world!");
};