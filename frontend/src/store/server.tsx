import { createEvent, createStore, sample } from "effector";

export const $currentServer = createStore(null);


export const changeServerEvent = createEvent<any>('change-server');

sample({
    clock: changeServerEvent,
    target: $currentServer
})