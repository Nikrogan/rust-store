'use client';

import { $userStores } from "@/store/auth";
import { useUnit } from "effector-react";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

export default function News() {
  const { isAuth } = useUnit($userStores);

  useLayoutEffect(() => {
    if(!isAuth) {
      redirect('/')
    }
  }, [isAuth])
  
  return (
    <></>
  )
}