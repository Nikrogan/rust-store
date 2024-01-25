'use client'
import { Flex, Card, Group, Badge, Progress, Button, Image, Text } from "@mantine/core"
import { theme } from "../theme/theme"

type ServerCardProps = {
  title?: string;
  currentOnline?: number;
  maxOnline?: number;
  buttonText?: string;
  onClick: () => void;
  serverId: number | null;
  isShort?: boolean;
}

export const ServerCard = ({title, currentOnline = 0, maxOnline, buttonText = 'Присоедениться', onClick, serverId, isShort}: ServerCardProps) => {
  const handleClick = () => {
    onClick()
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
            <Group justify="space-between">
              <Text size="md" mt="md"> {title}</Text>
              <Badge color="green">Online</Badge>
            </Group>
        <Group justify="center" mt="xs" mb="xs">
          <Text fz="lg">{currentOnline}/{maxOnline}</Text>
        </Group>
        <Progress value={currentOnline} mt={5} />
        <Button color="blue" fullWidth mt="md" radius="md">
          {buttonText}
        </Button>
        </Card>
    </Flex>
    )
}