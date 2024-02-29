import { theme } from "@/components/theme/theme";
import { useMantineColorScheme } from "@mantine/core";

export const useColor = () => {
    const {colorScheme} = useMantineColorScheme();

    return colorScheme === 'dark' ? theme.colors?.dark?.[9] : theme.colors?.blue?.[0]
}