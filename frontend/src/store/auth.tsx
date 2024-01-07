import { api } from '@/config/api';
import { cookies } from "next/headers";


import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { getCookie } from '@/cookie';
const defaultStore = {}


export const $user = createStore(null);
export const $isAuth = createStore<boolean>(defaultStore)

export const $userStore = combine({
    user: $user,
    isAuth: $isAuth   
})

export const authUserFx = createEffect(async (isAuth: boolean) => {
    const cookie = await getCookie('session')

    if(!cookie.value) return;
    return api.get('/api/User/steam-login');;
});

const getUserFx = createEffect(async () => {
    const cookie = await getCookie('session')
    if(!cookie) return false
    return api.get('/api/user', {
        headers: {
            Authorization: `Barer ${cookie}`
        }
    })
})


export const authUserEvent = createEvent();
export const getAuthStatusEvent = createEvent()


sample({
    clock: authUserFx.doneData,
    fn: (data) => {
        window.open(data.request.responseURL, 'target')
    }
})

sample({
    clock: getAuthStatusEvent,
    source: $isAuth,
    target: getUserFx
})


sample({
    clock: authUserEvent,
    target: authUserFx
})

sample({
    clock: authUserFx.doneData,
    fn: (data) => {
        console.log(data)
    }
})