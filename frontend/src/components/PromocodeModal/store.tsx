import { api, buildRequest } from "@/config/api";
import { buildModalStore } from "@/pageComponents/Modal/state";

export const {
    store,
    events: {
        open,
        close
    }
} = buildModalStore('promocodes')

export const {
    request: activePromocodeEvent, 
    store: promocodes
} = buildRequest('promocodes', {
    requestFn: (promocodes) => api.post(`/userpromo/${promocodes}`)
})