import { Button, ButtonGroup, Checkbox, Flex, InputWrapper, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

export const ModalProduct = ({isOpen, close}) => {

    return (
        <Modal opened={isOpen} onClose={close} title="Настройка товаров">
            <form>
                <InputWrapper label="Название товара" mt={8}>
                    <TextInput mt={4}/>
                </InputWrapper>
                <InputWrapper label="Тип" mt={8}>
                    <Select mt={4} />
                </InputWrapper>
                <InputWrapper label="Cтатус" mt={8}>
                    <Select mt={4} />
                </InputWrapper>
                <InputWrapper label="Категория" mt={8}>
                    <Select mt={4} />
                </InputWrapper>
                <InputWrapper label="Сервер" mt={8}>
                    <Select mt={4} />
                    <Checkbox label="Отображать в категории 'Все'" mt={8}/> 
                </InputWrapper>
                <InputWrapper label="Картинка" mt={8}>
                    <TextInput />
                </InputWrapper>
                <InputWrapper label="Цена" mt={8}>
                    <NumberInput />
                </InputWrapper>
                <InputWrapper label="Скидка" mt={8}>
                    <NumberInput />
                </InputWrapper>
                <InputWrapper label="Время блокировки товара после покупки" mt={8}>
                    <DateInput />
                </InputWrapper>
                <InputWrapper label="КД на покупку" mt={8}>
                <NumberInput />
                </InputWrapper>
                <InputWrapper label="Описание товара" mt={8}>
                <TextInput/>
                </InputWrapper>
                <Flex justify="end">
                    <ButtonGroup mt={12}>
                        <Button onClick={close}>Отменить</Button>
                        <Button ml={12} onClick={close}>Сохранить</Button>
                    </ButtonGroup>
                </Flex>
            </form>
        </Modal>
    )
}