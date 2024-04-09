import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $shopFilters = createStore(null);

export const getShopFiltersEvent = createEvent();
export const createProductEvent = createEvent();

const createProductFx = createEffect((data) => {
    return api.post('/admin/products', {
        ...data,
        Id: null,
        GiveCommand: 'дай денег'
    })
})

const getShopFiltersFx = createEffect(() => {
    return api.get('/shopfilters')
});

sample({
    clock: getShopFiltersEvent,
    target: getShopFiltersFx
});

sample({
    clock: getShopFiltersFx.doneData,
    fn: (data) => {
        return data.data.payLoad
    },
    target: $shopFilters
});

sample({
    clock: createProductEvent,
    fn: (data) => {
        console.log(123123)
        return data
    },
    target: createProductFx
})