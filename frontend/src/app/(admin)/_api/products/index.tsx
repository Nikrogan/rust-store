import { api, buildRequest } from "@/config/api";
import { sample } from "effector";

const {request: getProductsListRequest, store} = buildRequest('admin-products', {
    requestFn: () => api.get('/admin/products')
})


const {request: removeProductRequest, store: removeProductStatus} = buildRequest('admin-products', {
    requestFn: (id: string) => api.delete(`/admin/products/${id}`)
})

const {request: createProductRequest, store: productStatus} = buildRequest('admin-create-products', {
    requestFn: (body) => api.post('/admin/products', {
        body
    })
})


export const getProductsListEvent = getProductsListRequest;
export const removeProductEvent = removeProductRequest;
export const createProductEvent = createProductRequest;
export const $products = store


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