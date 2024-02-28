import { theme } from "@/components/theme/theme";
import { Button, useMantineColorScheme } from "@mantine/core"

export const ButtonWrapper = (props) => {
    const {children, isActive} = props;
    const { colorScheme} = useMantineColorScheme();
    const bg = isActive ? colorScheme === 'dark' ? theme.colors?.dark?.[9] : theme.colors?.blue?.[1] : undefined;
    return <Button bg={bg} color={!isActive && 'white'} {...props}>{children}</Button>
}