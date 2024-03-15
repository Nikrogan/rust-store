import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";


const mock = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

export const $salary = createStore(mock)


export const $promocodes = createStore(null);


export const getPromocodesEvent = createEvent();

const getPromocodesFx = createEffect(() => {
    return api.get('/promo')
});

export const createPromocodesEvent = createEvent()

const createPromocodesFx = createEffect((data) => {
    return api.post('/promo', data)
})


sample({
    clock: getPromocodesEvent,
    target: getPromocodesFx
})

sample({
  clock: getPromocodesFx.doneData,
  fn: (data) => {
    return data.data.payLoad
  },
  target: $promocodes
})

sample({
    clock: createPromocodesFx.doneData,
    target: $promocodes
})