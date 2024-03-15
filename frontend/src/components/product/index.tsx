import { Badge, Button, ButtonGroup, Card, Checkbox, Flex, Group, Image, InputWrapper, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { ModalProduct } from "../ModalProduct";

export const Product = ({key}) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={298} key={key}>
        <Card.Section>
            <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                height={160}
                alt="Norway"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink">Включено</Badge>
        </Group>

        <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
            Настроить
        </Button>
            <ModalProduct isOpen={opened} close={close} />
        </Card>
    )
}