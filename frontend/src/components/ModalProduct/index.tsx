import { api } from "@/config/api";
import { getCookie } from "@/cookie";
import { Box, Button, ButtonGroup, Checkbox, Flex, Group, Input, InputWrapper, Modal, NumberInput, Select, Stepper, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUnit } from "effector-react";
import { $shopFilters, getShopFiltersEvent } from "../ShopFilters/model";
import { useEffect, useState } from "react";
import { theme } from "../theme/theme";
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper";
import { StepOne } from "./components/stepOne";
import { StepSimpleProducts } from "./components/stepSimpleProducts";

const ProductTypeOptions = [
    "Предмет",
    "Рецепт",
    "Команда",
    "Набор",
    "Рулетка",
    "Товар с выбором"
]

const ProductTypeSubOptions = [
    "Предмет",
    "Рецепт",
    "Команда",
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
    const {shopFilters, getShopFilters } = useUnit({
        shopFilters: $shopFilters,
        getShopFilters: getShopFiltersEvent
    });

    const [active, setActive] = useState(0);
    const [activeSimpleProducts, setActiveSimpleProducts] = useState([{
        ruTitle: '',
        count: 0,
        productType: '',
        imageUrl: '',
        chance: 100
    }]);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const createProduct = async (data) => {
        api.post('/products', data)
    };
    const isShowSubmodal = form.getInputProps('productType').value === 'Рулетка' || form.getInputProps('productType').value === 'Набор'

    useEffect(() => {
        getShopFilters();
    }, []);
    
    const activeSimpleProductsView = activeSimpleProducts && activeSimpleProducts.map(item => {
        return (
            <Box style={{minWidth: '125px'}} key={item.ruTitle}>
                <InputWrapper label="Наименование">
                    <Input defaultValue={item.ruTitle} />
                </InputWrapper>
                <InputWrapper label="Кол-во товаров" mt={theme.spacing.md}>
                    <Input defaultValue={item.count} />
                </InputWrapper>
                {form.getInputProps('productType').value !== 'Набор' && <InputWrapper label="Шанс выпадения" mt={theme.spacing.md}>
                    <Input defaultValue={item.chance} />
                </InputWrapper>}
                <InputWrapper label="Картинка" mt={theme.spacing.md}>
                    <Input defaultValue={item.imageUrl} />
                </InputWrapper>
            </Box>
        )
    })

    return isOpen && (<Modal opened={isOpen} onClose={close} title="Настройка товаров" size="95%">
            <form onSubmit={form.onSubmit(createProduct)}>
                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step label="Добавление товара">
                        <StepOne form={form} shopFilters={shopFilters} productTypeOptions={ProductTypeOptions} />
                    </Stepper.Step>
                    {isShowSubmodal && (
                        <Stepper.Step label="Состав набора\рулетки">
                            <hr/>
                            <StepSimpleProducts setActiveSimpleProducts={setActiveSimpleProducts}>
                                {activeSimpleProductsView}
                            </StepSimpleProducts>
                        </Stepper.Step>
                    )}
                    <Stepper.Step label="Настройка статуса товара">
                        <InputWrapper label="Cтатус" mt={8}>
                            <Select mt={4} data={status} defaultValue={'Включен'}/>
                        </InputWrapper>
                        <InputWrapper label="Сервер, где отображается товар" mt={8}>
                            <Select mt={4} />
                            <Checkbox label="Отображать в категории 'Все'" mt={8}/> 
                        </InputWrapper>
                    </Stepper.Step>
                    <Stepper.Step label="Настройка цены">
                        <InputWrapper label="Цена" mt={8} >
                            <NumberInput {...form.getInputProps('price')}/>
                        </InputWrapper>
                        <InputWrapper label="Скидка" mt={8} >
                            <NumberInput max={100} min={0} placeholder="0-100"/>
                        </InputWrapper>
                    </Stepper.Step>

                </Stepper>

                <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Назад</Button>
                    <Button type={active === 4 && isShowSubmodal ? "submit" : "button"} onClick={active !== 3 && nextStep}>{active === 3 ? "Добавить" : "Дальше"}</Button>
                </Group>
            </form>
        </Modal>)
}
