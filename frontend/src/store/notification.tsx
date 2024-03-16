import { createEvent, createStore, sample } from "effector";



export const $notification = createStore([])


export const createNotificationEvent = createEvent();
export const deleteNotificationEvent = createEvent();


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
    fn: (store, notification) => store.filter((item) => item.id !== notification.id),
    target: $notification
})