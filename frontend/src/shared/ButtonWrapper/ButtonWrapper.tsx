import { theme } from "@/components/theme/theme";
import { Button, useMantineColorScheme } from "@mantine/core"
import { forwardRef } from "react";

const ButtonDefault = (props, ref) => {
    const {children, isActive} = props;
    const { colorScheme} = useMantineColorScheme();
    const bg = isActive ? colorScheme === 'dark' ? theme.colors?.dark?.[9] : theme.colors?.blue?.[1] : undefined;
    return <Button ref={ref} bg={bg} color={!isActive && 'white'} {...props}>{children}</Button>
}

export const ButtonWrapper = forwardRef(ButtonDefault)