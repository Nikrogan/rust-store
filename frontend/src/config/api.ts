import axios from 'axios';
import { createEffect, createEvent, createStore, sample } from 'effector';


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_CONFIG,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        key: 'Access-Control-Allow-Origin',
        value: process.env.NEXT_PUBLIC_APP_URL,
    },
}
)

export const buildRequest = (name, {
    requestFn
}) => {
    const store = createStore({
        isLoading: true,
        isError: false,
        data: null
    });

    const event = createEvent(`${name}-get-data`);
    const effectFx = createEffect(requestFn);

    sample({
        clock: event,
        target: effectFx,
    })

    sample({
        clock: effectFx.pending,
        fn: () => ({
                isLoading: true,
                isError: false,
                data: []
        }),
        target: store
    })

    sample({
        clock: effectFx.failData,
        fn: () => ({
                isLoading: false,
                isError: true,
                data: []
        }),
        target: store
    })

    sample({
        clock: effectFx.doneData,
        fn: ({data}) => ({
            isLoading: false,
            isError: true,
            data: data.payLoad
        }),
        target: store
    })

    return {
        request: event,
        store
    }
}