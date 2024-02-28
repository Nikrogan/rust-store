import { Box, Button, Checkbox, Flex, Group, Input, Loader, Modal, Select, useMantineColorScheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import "./styled.css";
import { useUnit } from "effector-react";
import { $paymentList, createPaymentEvent, getPaymentListEvent } from "@/store/balance";
import { $userStores } from "@/store/auth";

export const BalancaModal = ({isOpen, onClose}) => {
    const { colorScheme } = useMantineColorScheme();
    const isMobile = useMediaQuery('(max-width: 50em)');
    const [value, setValue] = useState<string | null>('');
    const {paymentData: {paymentList, isLoading}, user: {user}, getPaymentList, createPayment} = useUnit({
      paymentData: $paymentList,
      user: $userStores,
      getPaymentList: getPaymentListEvent,
      createPayment: createPaymentEvent
    })
    
    useEffect(() => {
      getPaymentList()
    }, []);

    const handleSubmit = (data) => {
      const currentPayment = paymentList.filter(item => item.displayName === data.paymentServiceKey)
      const paymentServiceKey = currentPayment[0].paymentServiceKey;
      const newData = {
        ...data,
        paymentServiceKey
      }
      createPayment(newData)
  };

    const handleSelectPayment = (payment: string | null) => {
      if(null) {
        setValue('')
      }

      form.setValues({
        paymentServiceKey: payment,
      })

      setValue(payment)
    }

    const form = useForm({
        initialValues: {
          steamId: user?.steamId,
          amount: null,
          paymentServiceKey: null,
          steamName: user?.displayName
        },
    
        validate: {
        },
    });

    const selectData = paymentList?.map(item => {
      return item.displayName
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
     {isLoading  ? <Flex justify="center"><Loader /></Flex> : <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Select
          withAsterisk
          label="Выберите платежную систему"
          data={selectData}
          value={value} 
          color={colorScheme === 'dark' ? 'white' : 'black'}
          onChange={handleSelectPayment}
        />
        {value && (
            <Input.Wrapper label="Введите сумму" >
                <Input  {...form.getInputProps('amount')}/>
            </Input.Wrapper>
        )}
        <Group justify="flex-end" mt="md">
          <Button type="submit">Пополнить</Button>
        </Group>
      </form>}
    </Box>
    </Modal>
}