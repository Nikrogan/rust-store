import { ModalSimpleProducts } from "@/components/ModalSimpleProducts";
import { InputWrapper, Select, Stepper, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";


export const StepOne = ({form, shopFilters, productTypeOptions, setActiveSimpleProducts}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [activeTab, setActiveTab] = useState<string | null>('all');

    return (
        <>
            <InputWrapper onClick={open} label="Выбрать товар" mt={8}>
                <Select mt={4} placeholder="Выбрать стандарный товар"/>
            </InputWrapper>
            <InputWrapper label="Название товара" mt={8}>
                <TextInput mt={4} {...form.getInputProps('title')} />
            </InputWrapper>
            <InputWrapper label="Тип" mt={8}>
                <Select defaultValue={'Предмет'} mt={4} data={productTypeOptions} {...form.getInputProps('productType')} />
            </InputWrapper>
            <InputWrapper label="Картинка" mt={8}>
                <TextInput {...form.getInputProps('imageUrl')} />
            </InputWrapper>
            <InputWrapper label="Категория" mt={8}>
                {shopFilters && 
                <Select mt={4} data={shopFilters && shopFilters.map(item => item.title)} defaultValue={'Все товары'} {...form.getInputProps('categoryType')} />}
            </InputWrapper>
            <InputWrapper label="Описание товара" mt={8}>
                <TextInput {...form.getInputProps('description')} />
            </InputWrapper>
            <ModalSimpleProducts
                isNotMultiple={true}
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