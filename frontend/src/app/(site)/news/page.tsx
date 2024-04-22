'use client'
import { useUnit } from "effector-react"
import { $newsList, getNewsEvent } from "./store"
import { Box, Button, Card, Flex, Image, Text, Title } from "@mantine/core"
import { useEffect } from "react"

import './page.css';
import Link from "next/link"


export default function PageNews () {
    const {news: {data}, getNews} = useUnit({
        news: $newsList,
        getNews: getNewsEvent
    })

    useEffect(() => {
        getNews()
    }, [])


    const newsListView = data.map((item, index) => {
        return <ShortNews id={index} key={item?.title + index} title={item.title} imgUrl={item.imgUrl} content={item.content} />
    });
    
    return <>
    <Title order={1} style={{marginTop: "90px", color: "white"}}>Новости</Title>
    <Flex mt={16} gap={36}>{newsListView}</Flex></>
}

export const ShortNews = ({title, imgUrl, content, id}) => {
    return <>
    <Link href={`/news/${id}`} style={{textDecoration: 'none'}}>
        
    <Card withBorder radius="md" p="md" >
        <Card.Section >
            <Image src={imgUrl} height={180} />
        </Card.Section>
        <Card.Section className="section" mt="md">
            <Text fz="lg" fw={500}>
                {title}
            </Text>
            <Text fz="sm" mt="xs">
                {content}
            </Text>
        </Card.Section>
        <Card.Section>
            <Button w={"100%"} h={48}> Прочитать</Button>
        </Card.Section>
    </Card>
    </Link>
    </>
}