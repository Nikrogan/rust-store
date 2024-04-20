import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { keyframes } from "styled-components";
import { $modal } from "@/app/(site)/shop/[id]/store";


export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(getRandomIntSecure() * (max - min)) + min;
  };
  
export const getRandomIntUnsafe = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomIntSecure = () => {
  const arr = new Uint32Array(2);
  crypto.getRandomValues(arr);
  const mantissa = (arr[0] * Math.pow(2, 20)) + (arr[1] >>> 12)
  const result = mantissa * Math.pow(2, -52);
  return result;
}

export const generateItems = (productsList, winItemIndex, itemLenghtInLine) => {
    let items = [];

    for (let index = 0; index < itemLenghtInLine; index++) {
      if (index === 13) {
        productsList[winItemIndex].winner = true;
        items.push(productsList[winItemIndex]);
      } else {
        items.push(productsList[getRandomInt(0, productsList.length)]);
      }
    }

    return items;
}

export const $roullete = createStore({
    isRun: false,
    sliderWidth: 0,
    items: []
})

export const buyRoulleteEvent = createEvent();

export const buyRoulleteFx = createEffect((productId) => {
    return api.post(`/productbuy/${productId}`)
})

sample({
    clock: buyRoulleteEvent,
    target: buyRoulleteFx
})


export const getSlider = (pos) => {
    return keyframes`
      0% {
        transform: translateX(0);
      }
  
      100% {
        transform: translateX(-${pos}px);
      }`;
  };