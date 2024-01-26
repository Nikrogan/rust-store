import { api } from '@/config/api';
import { createDomain, createEvent, sample } from 'effector'
import { getCookie } from '@/cookie';


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

export const getUserFx = authDomain.createEffect(async () => {
    const cookie = await getCookie('session')
    if(!cookie) return false
    return api.get('/user', {
        headers: {
            'Content-Type': 'application/json', // Set the default content type for request headers
            Authorization: `Barier ${cookie}`
        }
    })
})


export const authUserEvent = authDomain.createEvent();
export const getAuthStatusEvent = authDomain.createEvent()


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
    clock: authUserEvent,
    target: authUserFx
})

sample({
    clock: getUserFx.doneData,
    fn:(data) => {
        if(data) {
            return {
                isLoadng: false,
                user: data.data.payLoad,
                isAuth: true
            }
        } else {
            return {
                isLoadng: false,
                user: null,
                isAuth: false
            }
        }
       
    },
    target: $userStores
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