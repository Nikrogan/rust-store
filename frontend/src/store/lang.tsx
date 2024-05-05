import { createEvent, createStore, sample } from "effector";


const defaultStore = {
    currentLang: 'RU',
    langList: ['RU', 'EN']
}

export const $lang = createStore(defaultStore)

export const changeLangEvent = createEvent('change-user-lang');


sample({
    clock: changeLangEvent,
    source: $lang,
    fn: (store, currentLang) => ({
            ...store,
            currentLang
    }),
    target: $lang
})


