import { api, buildRequest } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { keyframes } from "styled-components";


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
    items: [],
    defaultItems: []
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


export const {request: productBuyEvent, store} = buildRequest('buy-product', {
  requestFn: (productId) => api.post(`/productbuy/${productId}`)
})

export const $NotificationList = createStore([]);

sample({
  source: store,
  fn: () => {
    if($NotificationList.getState().length === 3) {
      return $NotificationList.getState()
    }
    return [...$NotificationList.getState(), 'Недостаточно средств' ]
  },
  filter: (store) => {
    if(store.isLoading) {
      return false;
    }
    if(!store?.status) {
      return false;
    }
    if(store?.status === 700) {
      return true;
    }

    return false
  },
  target: $NotificationList
})


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
  clock: $NotificationList,
  filter: (store) => {
    if(store.length === 3) {
      return true;
    }

    return false
  },
  fn: () => {
    return 3;
  },
  target: startCountdown
})

sample({
  clock: countdown.tick,
  filter: (data) => {
      return data === 0
  },
  fn: () => {
      return []
  },
  target: $NotificationList
})