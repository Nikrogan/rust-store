import { api, buildRequest } from "@/config/api";
import { sample } from "effector";

const { request: getProductsListRequest, store } = buildRequest('admin-products', {
    requestFn: () => api.get('/admin/products')
})

const { request: removeProductRequest, store: removeProductStatus } = buildRequest('admin-products', {
    requestFn: (id: string) => api.delete(`/admin/products/${id}`)
})

const { request: createProductRequest, store: productStatus } = buildRequest('admin-create-products', {
    requestFn: (body) => api.post('/admin/products', body)
})

const { request: getDefaultItemsRequest, store: defaultItemsStore } = buildRequest('admin-default-items', {
    requestFn: () => api.get('/admin/defaultitems')
})

const { request: getCategoryTypeRequest, store: categoryStore } = buildRequest('admin-category-type', {
    requestFn: () => api.get('/shopfilters')
})

export const getDefaultItemsEvent = getDefaultItemsRequest;
export const getProductsListEvent = getProductsListRequest;
export const getCategoryTypeEvent = getCategoryTypeRequest;
export const removeProductEvent = removeProductRequest;
export const createProductEvent = createProductRequest;
export const $products = store
export const $defaultItems = defaultItemsStore;
export const $categoryStore = categoryStore;


sample({
    source: removeProductStatus,
    filter: ({status}) => {
        if(status === 200) {
            return true
        };
        return false
    },
    target: getProductsListEvent
})