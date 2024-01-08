import { AspectRatio, Group, Modal, SimpleGrid } from "@mantine/core"

export const ModalNews = () => {
    return <SimpleGrid cols={1}>
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
        <News />
    </SimpleGrid>
}

const News = () => {
    return <Group w={1280} h={275}>
    <AspectRatio ratio={16 / 9} maw={300} mx="200">
        <img    
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
            alt="Panda"
        />
    </AspectRatio>
    </Group>
}