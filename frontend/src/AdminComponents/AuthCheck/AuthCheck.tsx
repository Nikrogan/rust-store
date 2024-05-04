'use client'
import { $userStores, getAuthStatusEvent } from "@/store/auth";
import { useUnit } from "effector-react";
import { useEffect } from "react";

export const AuthCheck = ({children, role = 0}) => {
    const getUser = useUnit(getAuthStatusEvent)
    const {isLoading, user} = useUnit($userStores);

    useEffect(() => {
      getUser()
    }, [getUser])
    

    if(isLoading) {
        return null
    }

    if(!isLoading && user.role < role) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )

}