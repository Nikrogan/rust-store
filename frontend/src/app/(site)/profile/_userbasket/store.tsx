import { api, buildRequest } from "@/config/api";

export const { store: $userBasket, request: getUserBasketEvent } = buildRequest('user-basket', {
    requestFn: () => api.get('/userbasket')
})