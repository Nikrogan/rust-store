import { api, buildRequest } from "@/config/api";



type Server = {
    "serverKey": 0,
    "gamePort": 0,
    "ip": "string",
    "name": "string",
    "queryPort": 0,
    "currentOnline": 0,
    "maxOnline": 0,
    "queue": 0
}

const {request, store} = buildRequest('admin-servers', {
    requestFn: () => api.get('/admin/server')
})

const {request: addServerRequest } = buildRequest('admin-servers-add', {
    requestFn: (body: Server) => api.post('/admin/server', {
        body
    })
})


export const getServersEvent = request;
export const addServerEvent = addServerRequest;

export const $servers = store;