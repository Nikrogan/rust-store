import { api } from '@/config/api';
import { createDomain, createEffect, createEvent, sample } from 'effector'
import { createCookie, deleteCookie, getCookie } from '@/cookie';

const authDomain = createDomain();

const defaultStores = {
    isLoading: true,
    user: null,
    isAuth: null
}

export const $userStores = authDomain.createStore(defaultStores)

export const authUserFx = authDomain.createEffect(async (isAuth: boolean) => {
    return api.get('/user/auth');
});

export const logoutEvent = createEvent();

export const logoutFx = createEffect(() => {
    deleteCookie('role')
    return api.get('/user/logout')
})

export const getUserFx = authDomain.createEffect(async () => {
    const cookie = await getCookie('session')
    if(!cookie) return false
    return api.get('/user')
})


export const authUserEvent = authDomain.createEvent();
export const getAuthStatusEvent = authDomain.createEvent()
export const createCookieFx = authDomain.createEffect(async (role = 0) => {
    console.log(role)
    return false
})

sample({
    clock: authUserFx.doneData,
    fn: (data) => {
        if(data) {
            window.open(data.request.responseURL, '_self')
        }
    },
})

sample({
    clock: getAuthStatusEvent,
    target: getUserFx
})


sample({
    clock: getUserFx.pending,
    fn: () => {
        return {
            isLoading: true,
            user: null,
            isAuth: false
        }
    },
    target: $userStores
})

sample({
    clock: authUserEvent,
    target: authUserFx
})

sample({
    clock: getUserFx.doneData,
    fn:(data) => {
        if(data) {
            return {
                user: data.data.payLoad,
                isAuth: true
            }
        } else {
            return {
                isLoading: false,
                user: null,
                isAuth: false
            }
        }
       
    },
    target: $userStores
})

sample({
    clock: getUserFx.doneData,
    fn: (data) => {
        return data?.data?.payLoad?.role
    },
    target: createCookieFx
})

sample({
    clock: logoutEvent,
    fn: () => {
        return {
            isLoading: false,
            user: null,
            isAuth: null
        }
    },
    target: $userStores
})

sample({
    clock: logoutEvent,
    target: logoutFx
})