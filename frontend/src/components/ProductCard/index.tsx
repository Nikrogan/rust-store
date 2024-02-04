'use client'
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core"

type ProductCardProps = {
 imageSrc?: string;
 title?: string;
 price?: string | number;
 buttonText?: string;
}

export const ProductCard = ({title='Minicopter х1', imageSrc = 'https://bwrust.ru/uploads/items/minicopter.png', price = 'free', buttonText = 'Купить'}: ProductCardProps) => {
    return (
        <Card shadow="xl" radius="md" padding="md">
            <Card.Section>
                <Image
                    src={imageSrc}
                    w={240}
                    height={160}
                    fit="contain"
                    alt="Norway"
                    pt="md"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
            <Badge color="pink">{price} {price !== "free" && "BW"}</Badge>
            </Group>

            <Button color="blue" fullWidth mt="md" radius="md">
                {buttonText}
            </Button>
        </Card>
    )
}