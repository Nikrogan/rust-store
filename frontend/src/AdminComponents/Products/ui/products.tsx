import { ModalProduct } from "@/components/ModalProduct"
import { theme } from "@/components/theme/theme";
import { Button, Flex, Group, Input, Tabs } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

export const Products = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Tabs.Panel value="products" p={theme.spacing.sm}>
        <Group>
            <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16}/>
            <Button onClick={open}>Добавить товар</Button>
        </Group>
        <Flex gap={20} wrap="wrap" ml={8}>
            {/* {a.map((item, index) => {
                return <Product key={index + 21} />
            })} */}
        </Flex>
        {opened && <ModalProduct isOpen={opened} close={close} /> }
    </Tabs.Panel>
    )
}