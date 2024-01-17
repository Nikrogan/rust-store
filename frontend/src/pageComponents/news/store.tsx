import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";


const defaultStore = {
    isLoading: true,
    data: []
}

export const $news = createStore([])


export const createNewsEvent = createEvent('create-news');


const createNewsFx = createEffect((content: string) => {
    return api.post('/api/v1/news')
})
sample({
    clock: createNewsEvent,
    target: createNewsFx
})