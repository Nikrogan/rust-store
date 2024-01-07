'use server'

import { cookies } from "next/headers"


export const getCookie = async (name: string) => {
    const cookieStore = cookies()
    return cookieStore.get(name)
}