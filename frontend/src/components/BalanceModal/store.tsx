import { api, buildRequest } from "@/config/api";
import { buildModalStore } from "@/pageComponents/Modal/state";
import { createStore, sample } from "effector";

export const {
    store,
    events: { close, open}
} = buildModalStore('balance')



const {request: getPaymentServicesRequest, store: paymentServicesStore} = buildRequest('get-paymentMethod-list', {
    requestFn: () => api.get('paymentservices')
})

export const $loading = createStore(false);



const {request: createPaymentRequest, store: createPaymentStore} = buildRequest('create-payment', {
    requestFn: (body) => api.post('paymentservices', body)
})

export const getPaymentServicesEvent = getPaymentServicesRequest;
export const $paymentServices = paymentServicesStore;

export const createPaymentEvent = createPaymentRequest;
export const $createPayment = createPaymentStore;


sample({
    clock: createPaymentStore,
    source: $loading,
    fn: (state, store) => {
        if(!store.isLoading && store.data) {
            window.open(
                store.data,
                    "_self",
            );
        }

        if(!store.isLoading && !store.data) {
            return false;
        }
        return true;
    },
    target: $loading
})