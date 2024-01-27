'use server'

import { cookies } from "next/headers"


export const getCookie = async (name: string) => {
    const cookieStore = cookies()
    return cookieStore.get(name)
}

export const deleteCookie = async (name: string) => {
    const cookieStore = cookies()
    return cookieStore.delete(name)
}