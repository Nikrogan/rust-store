import { api, buildRequest } from "@/config/api";

export const { store: $PromoCodeList, request: getPromoCodeListEvent} = buildRequest('promocodesProfile', {
    requestFn: () => api.get('/userpromo')
})