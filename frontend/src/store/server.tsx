import { createEvent, createStore, sample } from "effector";
import {getProductsEvent} from '../app/(site)/shop/store'
export const $currentServer = createStore(null);


export const changeServerEvent = createEvent<any>('change-server');

sample({
    clock: changeServerEvent,
    target: $currentServer
})

sample({
    clock: changeServerEvent,
    target: getProductsEvent
})