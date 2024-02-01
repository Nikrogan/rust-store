import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

const defaultStore = {
    isLoading: false,
    isError: false,
    data: []
}

export const $newsList = createStore(defaultStore)

const getNewsFx = createEffect(() => {
    return api.get('/news');
})

export const getNewsEvent = createEvent('get-news')


sample({
    clock: getNewsEvent,
    target: getNewsFx
})

sample({
    clock: getNewsFx.doneData,
    fn: ({data}) => {
        console.log(12321)
        return {
            isLoading: false,
            isError: false,
            data: data.payLoad
        }
    },
    target: $newsList
})