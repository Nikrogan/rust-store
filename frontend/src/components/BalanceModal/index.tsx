import { Box, Button, Checkbox, Group, Input, Modal, Select, TextInput } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import { useState } from "react";

export const BalancaModal = ({isOpen, onClose}) => {
    const isMobile = useMediaQuery('(max-width: 50em)');
    const [value, setValue] = useState<string | null>('');

    const form = useForm({
        initialValues: {
          email: '',
          termsOfService: false,
        },
    
        validate: {
        },
      });
    return <Modal 
        opened={isOpen} 
        onClose={onClose} 
        title="Пополнения баланса" 
        transitionProps={{ transition: 'fade', duration: 300 }}
        fullScreen={isMobile}
        centered
        
    >
     <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          withAsterisk
          label="Выберите способ оплаты"
          data={['Freekassa', 'Lava', 'Tome', 'Paypal']}
          value={value} 
          onChange={setValue}
        />
        {value && (
            <Input.Wrapper label="Введите сумму">
                <Input  />
            </Input.Wrapper>
        )}
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    </Modal>
}