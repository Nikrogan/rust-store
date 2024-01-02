'use-client'
import { Flex, Card, Group, Badge, Progress, Button, Image, Text } from "@mantine/core"
import { theme } from "../theme/theme"

type ServerCardProps = {
  buttonText: string;
  onClick: (T: number | null) => void;
  serverId: number | null;
  isShort?: boolean;
}

export const ServerCard = ({buttonText = 'Присоедениться', onClick, serverId, isShort}: ServerCardProps) => {
    const handleClick = () => {
      onClick(serverId)
    }
    return (
    <Flex gap={theme?.spacing?.md}  justify='center'>
        <Card shadow="sm" padding={isShort ? "md" : "lg"} radius="md" withBorder onClick={handleClick}>
         {!isShort && <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>}
        <Text size="md" mt="md">
              BWRUST #1 [X3/MAX 3]
          </Text>
        <Group justify="space-between" mt="xs" mb="xs">
            <Text size="sm" c="dimmed">
                 connect 109.248.4.110:11111
            </Text>
            <Badge color="green">Online</Badge>
        </Group>
        <Progress value={62} mt={5} />
        <Group justify="space-between" mt="md">
            <Text fz="sm">20 из 100 игрокоов</Text>
            <Badge size="sm">Вайп 4 дня назад</Badge>
        </Group>
            <Button color="blue" fullWidth mt="md" radius="md">
               {buttonText}
            </Button>
        </Card>
    </Flex>
    )
}