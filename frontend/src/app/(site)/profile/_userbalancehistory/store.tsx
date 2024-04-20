import { api, buildRequest } from "@/config/api";

export const { store: $userBalanceHistory, request: getUserBalanceHistoryEvent } = buildRequest('user-balance-history', {
    requestFn: () => api.get('/userbalanceaction')
})