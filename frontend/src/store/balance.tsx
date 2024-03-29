import { api } from "@/config/api";
import { createDomain, createEffect, createEvent, createStore, sample } from "effector";


const domain = createDomain('payment')

const defaultState = {
    isLoading: true,
    paymentList: []
}

export const $paymentList = domain.createStore(defaultState);

export const getPaymentListEvent = domain.createEvent();

const getPaymentListFx = domain.createEffect(() => {
    const data = api.get('/paymentservices')
    return data
})

sample({
    clock: getPaymentListEvent,
    target: getPaymentListFx
})

sample({
    clock: getPaymentListFx.pending,
    fn: () => {
        return {
            isLoading: false,
            paymentList: []
        }
    },
    target: $paymentList
})

sample({
    clock: getPaymentListFx.doneData,
    fn: ({data}) => {
        return {
            isLoading: false,
            paymentList: data.payLoad
        };
    },
    target: $paymentList
})

const getPaymentMethodFx = createEffect((data) => {
    return api.post(`/paymentservices`, data)
})

export const $paymentMethod =  createStore(null)

export const createPaymentEvent = createEvent<string>();


sample({
    clock: createPaymentEvent,
    target: getPaymentMethodFx
})

sample({
    clock: getPaymentMethodFx.doneData,
    fn: (data) => {

        window.open(
            `${data.data.payLoad}`,
            "_self",
        );
    },
    target: $paymentMethod
})