import { api, buildRequest } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

const defaultModalStore = {
    isOpen: false,
    content: null,
    type: null
}

export const $roullete = createStore({
    isRun: false,
    sliderWidth: 0,
    items: [],
    defaultItems: []
})


export const $modal = createStore(defaultModalStore)

const {request, store: productsStore} = buildRequest('get-products', {
    requestFn: (id = ' ') => api.get(`/products/${id}`)
})

export const getProductsEvent = request
export const $products = productsStore;

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
            items: data.insideProducts,
            defaultItems: data.insideProducts
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