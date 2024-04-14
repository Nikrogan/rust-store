import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $stores = createStore({});

export const getDefaultItemsEvent = createEvent();
const getDefaultItemsFx = createEffect(() => {
    return api.get('/defaultitems')
});

sample({
    clock: getDefaultItemsEvent,
    target: getDefaultItemsFx
})

sample({
    clock: getDefaultItemsFx.doneData,
    target: $stores
})