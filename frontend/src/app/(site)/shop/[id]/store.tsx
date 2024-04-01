import { api } from "@/config/api";
import { combine, createEffect, createEvent, createStore, sample } from "effector";


export const getProductsEvent = createEvent('')
export const $products = createStore(null);

const getProductsFx = createEffect(async () => {
    const {data} = await api.get('/products', )
    return data
})

sample({
    clock: getProductsEvent,
    target: getProductsFx
})

sample({
    clock: getProductsFx.doneData,
    target: $products
})

export const events = {
    getProducts: getProductsEvent
}