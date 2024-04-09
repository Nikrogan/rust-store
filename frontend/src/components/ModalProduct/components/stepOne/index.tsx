import { InputWrapper, Select, Stepper, TextInput } from "@mantine/core"


export const StepOne = ({form, shopFilters, productTypeOptions}) => {

    return (
        <>
            <InputWrapper label="Название товара" mt={8}>
                <TextInput mt={4} {...form.getInputProps('title')} />
            </InputWrapper><InputWrapper label="Тип" mt={8}>
                <Select defaultValue={'Предмет'} mt={4} data={productTypeOptions} {...form.getInputProps('productType')} />
            </InputWrapper>
            <InputWrapper label="Картинка" mt={8}>
                <TextInput {...form.getInputProps('imageUrl')} />
            </InputWrapper><InputWrapper label="Категория" mt={8}>
                {shopFilters && <Select mt={4} data={shopFilters && shopFilters.map(item => item.title)} defaultValue={'Все товары'} {...form.getInputProps('categoryType')} />}
            </InputWrapper><InputWrapper label="Описание товара" mt={8}>
                <TextInput {...form.getInputProps('description')} />
            </InputWrapper>
        </>
    )
}