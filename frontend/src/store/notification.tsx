import { createEffect, createEvent, createStore, sample } from "effector";

export const $notification = createStore([])
export const createNotificationEvent = createEvent();
export const deleteNotificationEvent = createEvent();

const deleteNotificationFx = createEffect(async (store) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(store)
            res(store.at(-1))
        }, 1000)
    })

})

sample({
    clock: createNotificationEvent,
    source: $notification,
    fn: (store, notification) => {
        return [
            notification,
            ...store,
        ]
    },
    filter: (store) => {
        return store.length <= 2
    },
    target: $notification
})


sample({
    clock: deleteNotificationEvent,
    source: $notification,
    fn: (store, notification) => {
        return store.filter((item) => item.id !== notification.id)
    },
    target: $notification
})

sample({
    source: $notification,
    filter: (store) => {
        return store.length !== 0
    },
    target: deleteNotificationFx
})

sample({
    clock: deleteNotificationFx.doneData,
    fn: (data) => {
        console.log(data)
        return data
    },
    target: deleteNotificationEvent
})