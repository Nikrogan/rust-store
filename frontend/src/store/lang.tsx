import { createEvent, createStore, sample } from "effector";


const defaultStore: {
    currentLang: "RU" | "EN",
    langList: string[]
} = {
    currentLang: 'RU',
    langList: ['RU', 'EN']
}

export const $lang = createStore(defaultStore)

export const changeLangEvent = createEvent<"RU" | "EN">('change-user-lang');


sample({
    clock: changeLangEvent,
    source: $lang,
    fn: (store, currentLang) => ({
            ...store,
            currentLang
    }),
    target: $lang
})


