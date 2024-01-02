'use-client'
import { Group, UnstyledButton, Text, Avatar, rem } from "@mantine/core"
import { IconChevronRight } from '@tabler/icons-react';

import classes from './userAvatar.module.css';

export const UserAvatar = () => {
    return (
        <UnstyledButton className={classes.user}>
            <Group wrap="nowrap">
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                radius="xl"
            />
    
            <div style={{ flex: 1, color: "#ffffff", }}>
                <Text size="sm" fw={500}>
                    *UserName*
                </Text>
    
                <Text c="dimmed" size="xs">
                    *balance*
                </Text>
            </div>
    
                <IconChevronRight style={{ width: rem(14), height: rem(14) }} color="white" stroke={1.5} />
            </Group>
      </UnstyledButton>
    )
}