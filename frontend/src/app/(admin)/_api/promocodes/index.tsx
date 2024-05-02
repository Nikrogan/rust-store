import { api, buildRequest } from "@/config/api";

const {request: getPromocodesRequest, store} = buildRequest('admin-promocodex', {
    requestFn: () => api.get('/admin/promo')
})

export const getPromocodesEvent = getPromocodesRequest;
export const $promocodes = store;