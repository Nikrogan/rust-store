import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $shopFilters = createStore(null);

export const getShopFiltersEvent = createEvent();

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