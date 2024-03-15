'use client'
import { $userStores, getAuthStatusEvent } from "@/store/auth";
import { Box, LoadingOverlay } from "@mantine/core";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthCheck = ({children}) => {
    const getUser = useUnit(getAuthStatusEvent)
    const {isLoading} = useUnit($userStores);

    useEffect(() => {
      getUser()
    }, [getUser])
    

    if(isLoading) {
        return <Box pos="relative"> 
          <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} style={{height: "calc(100vh - 76px)"}} />
      </Box>
    }

    return (
        <>
            {children}
        </>
    )

}