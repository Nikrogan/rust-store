import { api, buildRequest } from "@/config/api";


export const { request, store} = buildRequest('work-ban-page', {
    requestFn: () => api.get('/admin/playercheck')
})