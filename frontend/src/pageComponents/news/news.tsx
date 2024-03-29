import { NewsModal } from "@/components/NewsModal/NewsModal";
import { Badge, Button, Card, Flex, Group, Image, Input, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";


const NewsData = [
    {
        title: 'test',
        id: 1,
        imageUrl: null,
        dateCreate: new Date(),
        content: ''
    },
    {
        title: 'Лучшая новость 22289',
        id: 1,
        imageUrl: null,
        dateCreate: new Date(),
        content: ''
    },
]

export const NewsList = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const NewsListView = NewsData.map((newsItem) => {
        return <News key={newsItem.title + newsItem.imageUrl} title={newsItem.title} imageUrl={newsItem.imageUrl} content={newsItem.content} />
    })
    return <div>
        <Group>
            <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16}/>
            <Button onClick={open} as="button">Создать новость</Button>
        </Group>
        <Flex gap={20} wrap="wrap" ml={8}>
            {NewsListView}
        </Flex>
        <NewsModal isOpen={opened} onClose={close}  />
    </div>
}


const News = ({title, imageUrl, content}) => {
    const [opened, { open, close }] = useDisclosure(false);

    return <Card shadow="sm" padding="lg" radius="md" withBorder w={298}>
    <Card.Section>
        <Image
            src={imageUrl || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
            height={160}
            alt="Norway"
        />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {content}
    </Group>

    <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
        Изменить новость
    </Button>
    </Card>
}