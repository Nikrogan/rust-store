import {createEffect, createEvent, createStore, sample} from 'effector';
import {api} from '../../../config/api';

const defaultStore = {
    isLoading: true,
    isError: false,
    data: []
}

export const $products = createStore(defaultStore)


const getProductsFx = createEffect(() => {
    return api.get('/products');
});

export const getProductsEvent = createEvent('get-products')

sample({
    clock: getProductsEvent,
    target: getProductsFx
})

sample({
    clock: getProductsFx.doneData,
    fn: ({data}) => {
        return {
            isError: false,
            isLoading: false,
            data: data.payLoad
        }
    },
    target: $products
})