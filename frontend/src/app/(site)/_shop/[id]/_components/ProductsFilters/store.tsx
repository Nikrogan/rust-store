import { createEvent, createStore, sample } from "effector";



export const $currentFilters = createStore('6615cb6d813995074b907cf4'); 


export const changeCurrentFiltersEvent = createEvent();

sample({
    clock: changeCurrentFiltersEvent,
    target: $currentFilters
})