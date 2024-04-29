'use client'
import { $userStores, getAuthStatusEvent } from "@/store/auth";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import styled from "styled-components";

export const AuthCheck = ({children}) => {
    const getUser = useUnit(getAuthStatusEvent)
    const {isLoading} = useUnit($userStores);

    useEffect(() => {
      getUser()
    }, [getUser])
    

    if(isLoading) {
        return null
    }

    return (
        <>
            {children}
        </>
    )

}