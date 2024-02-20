'use client'
import { useUnit } from "effector-react"
import { $newsList, getNewsEvent } from "./store"
import { Box, Flex, Image, Text, Title } from "@mantine/core"
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
        return <ShortNews key={item.title} title={item.title} imgUrl={item.imgUrl} content={item.content} />
    });
    
    return <>
    <div>Page News </div>
    <Flex direction="column">{newsListView}</Flex></>
}

export const ShortNews = ({title, imgUrl, content}) => {
    return <Box>
        <Title>{title}</Title>
        <Image src={imgUrl} />
        <Text>{content}</Text>
    </Box>
}