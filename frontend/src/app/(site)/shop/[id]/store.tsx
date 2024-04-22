import { $NotificationList, $roullete, buyRoulleteFx, generateItems, getRandomInt, getSlider } from "@/components/roullete/store";
import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

const defaultModalStore = {
    isOpen: false,
    content: null,
    type: null
}

export const $modal = createStore(defaultModalStore)

export const getProductsEvent = createEvent('')
export const $products = createStore(null);

const getProductsFx = createEffect(async (id) => {
    const {data} = await api.get(`/products/${id}`, )
    return data
})

sample({
    clock: getProductsEvent,
    target: getProductsFx
})

sample({
    clock: getProductsFx.doneData,
    target: $products
})


export const openModalEvent = createEvent();
export const closeModalEvent = createEvent();


sample({
    clock: openModalEvent,
    fn: (data) => {
        return {
            isOpen: true,
            content: data,
            type: data.productType
        }
    },
    target: $modal
})

sample({
    clock: openModalEvent,
    source: $roullete,
    filter: (store, data) => {
        return data.productType === 2
    },
    fn: (store, data) => {
        return {
            ...store,
            items: data.insideProducts
        }
    },
    target: $roullete
})

sample({
    clock: closeModalEvent,
    fn: () => {
        return {
            isOpen: false
        }
    },
    target: $modal
})

sample({
    clock: buyRoulleteFx.doneData,
    source: $modal,
    fn: (modalStore, { data }) => {
        const winIndex = modalStore.content.insideProducts.findIndex(x => x.title === data.payLoad.title)
        return {
            isRun: true,
            sliderWidth: getSlider(getRandomInt(2750, 2890)),
            items: generateItems(modalStore.content.insideProducts, winIndex, 50)
        }
    },
    target: $roullete
})


sample({
    clock: closeModalEvent,
    source: $roullete,
    fn: (state) => {
        return {
            ...state,
            sliderWidth: 0
        }
    },
    target: $roullete
})

export const events = {
    getProducts: getProductsEvent,
    closeModal: closeModalEvent,
    openModal: openModalEvent
}


function createCountdown(name, { start, abort = createEvent(`${name}Reset`), timeout = 1000 }) {
    // tick every 1 second
    const $working = createStore(true, { name: `${name}Working` });
    const tick = createEvent(`${name}Tick`);
    const timerFx = createEffect(`${name}Timer`).use(() => wait(timeout));
  
    $working.on(abort, () => false).on(start, () => true);
  
    sample({
      source: start,
      filter: timerFx.pending.map((is) => !is),
      target: tick,
    });
  
    sample({
      clock: tick,
      target: timerFx,
    });
  
    const willTick = sample({
      source: timerFx.done.map(({ params }) => params - 1),
      filter: (seconds) => seconds >= 0,
    });
  
    sample({
      source: willTick,
      filter: $working,
      target: tick,
    });
  
    return { tick };
  }
  
  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


const startCountdown = createEvent();
const abortCountdown = createEvent();

export const countdown = createCountdown("simple", {
  start: startCountdown,
  abort: abortCountdown,
});

sample({
    clock: buyRoulleteFx.doneData,
    fn: () => {
        return 5
    },
    target: startCountdown
})


sample({
    clock: countdown.tick,
    source: $roullete,
    filter: (_, data) => {
        return data === 0
    },
    fn: (store) => {
        return {
            ...store,
            isRun: false
        }
    },
    target: $roullete
})