import { theme } from "@/components/theme/theme"
import { Flex, Progress, Text } from "@mantine/core"

export const Server = ({currentServer}) => {
    return (
        <>
            <Text mt={theme.spacing.xs}>{currentServer.title}</Text>
            <Flex align='center'>
              <Progress w={200} value={(currentServer.currentOnline / currentServer.maxOnline) * 100} />
              <Text ml={theme.spacing?.xs}>{currentServer.currentOnline} / {currentServer.maxOnline}</Text>
            </Flex>
        </>
    )
}