import { ModalSimpleProducts } from "@/components/ModalSimpleProducts";
import { theme } from "@/components/theme/theme";
import { Button,  Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const StepSimpleProducts = ({children, setActiveSimpleProducts}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [activeTab, setActiveTab] = useState<string | null>('all');

    return (
        <>
        <Button onClick={open}>Выбрать предметы</Button>
        <Flex gap={theme.spacing.md} mt={theme.spacing.lg} wrap="wrap" rowGap={theme.spacing.xl}>
            {children}
        </Flex>
        <ModalSimpleProducts 
                opened={opened}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setActiveSimpleProducts={setActiveSimpleProducts}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems} 
                close={close}        
                />
        </>
    )
}


