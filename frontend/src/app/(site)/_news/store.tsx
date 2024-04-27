import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

const defaultStore = {
    isLoading: false,
    isError: false,
    data: [
        {
            title: "Здесь будет какой-то заголовок",
            imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
            content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
        },
        {
            title: "Здесь будет какой-то заголовок",
            imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
            content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
        },
        {
            title: "Здесь будет какой-то заголовок",
            imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
            content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
        },
    ]
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
        return {
            isLoading: false,
            isError: false,
            data: data.payLoad.length > 0 ? data.payLoad : [
                {
                    title: "Здесь будет какой-то заголовок",
                    imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
                    content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
                },
                {
                    title: "Здесь будет какой-то заголовок",
                    imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
                    content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
                },
                {
                    title: "Здесь будет какой-то заголовок",
                    imgUrl: 'https://bwrust.ru/uploads/test/background.webp',
                    content: 'Здесь будет какое-то описание новости краткое, первое предложение из новости или что-то вроде этого'
                },
            ]
        }
    },
    target: $newsList
})