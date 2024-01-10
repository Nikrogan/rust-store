import { Button, Flex, Group, Image, Modal, SimpleGrid, Text, Title } from "@mantine/core";
import './styled.css';
import { useRouter } from "next/navigation";

export const ModalNews = () => {
    return <Flex mt={64} direction="column" align="center">
        <News slug="1"/>
        <News slug="2"/>
        <News slug="3"/>
        <Button mb={16} mt={16}>Показать еще...</Button>
    </Flex>
}

const News = ({slug}) => {
    const router = useRouter()
    return <div className="news__card">
        <Group w={1280} h={275} ml={16} mr={16} mt={16} onClick={() => {
        router.push(`/news/${slug}`)
    }}>
        <Flex>
            <Flex w={320} m={32}>
                <Image  
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
                    alt="Panda"
                    width={320}
                />
            </Flex>
            <Flex justify="center" direction="column">
                <Title c="#e8771b">Январь 04 2024</Title>
                <Text c="white" fs="20" >Rust - Update 04.01.2024</Text>
            </Flex>
        </Flex>
    </Group>
    </div>
}