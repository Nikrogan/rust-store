'use client'
import { useUnit } from "effector-react"
import { $newsList, getNewsEvent } from "./store"
import { Box, Flex } from "@mantine/core"
import { useEffect } from "react"

export default function PageNews () {
    const {news: {data}, getNews} = useUnit({
        news: $newsList,
        getNews: getNewsEvent
    })

    useEffect(() => {
        getNews()
    }, [])

    const newsListView = data.map(item => {
        return <ShortNews />
    });
    
    return <>
    <div>Page News </div>
    <Flex>{newsListView}</Flex></>
}

export const ShortNews = () => {
    return <Box></Box>
}