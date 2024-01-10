import { api } from "@/config/api";
import { getCookie } from "@/cookie";
import { Button, ButtonGroup, Checkbox, Flex, InputWrapper, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

const ProductTypeOptions = [
    "Предмет",
    "Рецепт",
    "Команда",
    "Набор",
    "Рулетка",
    "Товар с выбором"
]

const CategoryList = [
    'Оружие',
    'Привилегии'
]

const status = [
    'Включен',
    'Отключен'
]


export const ModalProduct = ({isOpen, close}) => {
    const form = useForm()
    const createProduct = async (data) => {
        console.log(data)
        const cookie = await getCookie('session')
        const cookieValue = cookie.value
        api.post('api/v1/products', data, {
            headers: {
                'Content-Type': 'application/json', // Set the default content type for request headers
                'Authorization': `Barear ${cookieValue} `
            },
        })
    }
    return (
        <Modal opened={isOpen} onClose={close} title="Настройка товаров">
            <form onSubmit={form.onSubmit(createProduct)}>
                <InputWrapper label="Название товара" mt={8} {...form.getInputProps('title')} >
                    <TextInput mt={4}/>
                </InputWrapper>
                <InputWrapper label="Тип" mt={8}>
                    <Select mt={4} data={ProductTypeOptions}/>
                </InputWrapper>
                <InputWrapper label="Cтатус" mt={8}>
                    <Select mt={4} data={status} />
                </InputWrapper>
                <InputWrapper label="Категория" mt={8}>
                    <Select mt={4} data={CategoryList} defaultValue={'Включен'}/>
                </InputWrapper>
                <InputWrapper label="Сервер" mt={8}>
                    <Select mt={4} />
                    <Checkbox label="Отображать в категории 'Все'" mt={8}/> 
                </InputWrapper>
                <InputWrapper label="Картинка" mt={8} {...form.getInputProps('imageUrl')}>
                    <TextInput />
                </InputWrapper>
                <InputWrapper label="Цена" mt={8}>
                    <NumberInput />
                </InputWrapper>
                <InputWrapper label="Скидка" mt={8} >
                    <NumberInput max={100} min={0} placeholder="0-100"/>
                </InputWrapper>
                <InputWrapper label="Время блокировки товара после покупки" mt={8}>
                    <DateInput />
                </InputWrapper>
                <InputWrapper label="КД на покупку" mt={8}>
                    <NumberInput {...form.getInputProps('test')}/>
                </InputWrapper>
                <InputWrapper label="Описание товара" mt={8}>
                    <TextInput {...form.getInputProps('description')}/>
                </InputWrapper>
                <Flex justify="end">
                    <ButtonGroup mt={12}>
                        <Button onClick={close}>Отменить</Button>
                        <Button ml={12} type="submit">Сохранить</Button>
                    </ButtonGroup>
                </Flex>
            </form>
        </Modal>
    )
}