import { api } from '@/config/api';
import {createEffect, createEvent, createStore, sample} from 'effector'
const defaultStore = false
export const $isAuth = createStore<boolean>(defaultStore)


export const authUserFx = createEffect(async () => {
    const data = await api.get('api/User/steam-login')
    return data
});


export const authUserEvent = createEvent();



sample({
    clock: authUserEvent,
    target: authUserFx
})

sample({
    clock: authUserFx.doneData,
    fn: (data) => {
        window.open(data.request.responseURL, '_blank')
    }   
})
