import { $currentFilters } from "@/app/(site)/_shop/[id]/_components/ProductsFilters/store";
import { api } from "@/config/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const $shopFilters = createStore(null);

export const getShopFiltersEvent = createEvent();
export const createProductEvent = createEvent();


const ProductTypeOptions = {
    "Предмет": 0,
    "Рецепт": 1,
    "Команда": 2,
    "Набор": 3,
    "Рулетка": 4,
    "Товар с выбором": 5
}

const createProductFx = createEffect((data) => {
    return api.post('/admin/products', {
        ...data,
        Id: null,
        GiveCommand: 'дай денег'
    })
})

const getShopFiltersFx = createEffect(() => {
    return api.get('/shopfilters')
});

sample({
    clock: getShopFiltersEvent,
    target: getShopFiltersFx
});

sample({
    clock: getShopFiltersFx.doneData,
    fn: (data) => {
        return data.data.payLoad
    },
    target: $shopFilters
});

sample({
    clock: getShopFiltersFx.doneData,
    fn: (data) => {
        return data.data.payLoad[0].id
    },
    target: $currentFilters
})

sample({
    clock: createProductEvent,
    source: $shopFilters,
    fn: (shopFilters = [], data) => {
        return {
            ...data,
            productType: ProductTypeOptions[data.productType],
            categoryType: shopFilters.filter(x => x.title === data.categoryType)[0]?.id
        }
    },
    target: createProductFx
})