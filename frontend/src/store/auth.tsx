import { api } from '@/config/api';
import {createEffect, createEvent, createStore, sample} from 'effector'
const defaultStore = false
export const $isAuth = createStore<boolean>(defaultStore)


export const authUserFx = createEffect(() => {
    return api.get('/api/User/api/User/steam-login')
});


export const authUserEvent = createEvent();



sample({
    clock: authUserEvent,
    target: authUserFx
})

sample({
    clock: authUserFx.doneData,
    fn: (data) => {
        window.open(data, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
    }   
})
