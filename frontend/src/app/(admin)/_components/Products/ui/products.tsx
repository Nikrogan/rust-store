'use client'
import { SimpleAction } from "@/shared/utils/simpleAction";
import { PageTitle } from "../../PageTitle";
import { useUnit } from "effector-react";
import { $categoryStore, $products, createProductEvent, getCategoryTypeEvent, getProductsListEvent, removeProductEvent } from "@/app/(admin)/_api/products";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import styled from "styled-components";
import { TableWrapper } from "@/components/TableWrapper";
import { Modal } from "@/pageComponents/Modal";
import { Input, InputLabelText } from "@/components/form/input/Input";
import { Select } from "@/components/form/select";
import { Controller, useForm } from "react-hook-form";
import { DefaultProductsModal } from "../_components/DefaultProductsModal";
import JoditEditor from "jodit-react";

export const Products = () => {
    const getProducts = useUnit(getProductsListEvent);
    const getCategoryType = useUnit(getCategoryTypeEvent);
    const createProduct = useUnit(createProductEvent);
    const removeProduct = useUnit(removeProductEvent);
    const categoryStores = useUnit($categoryStore);
    const [isOpen, setOpen] = useState(false);
    const [customOpenModal, setCustomOpenModal] = useState(false);
    const {data, isLoading} = useUnit($products);
    const editor = useRef(null);
	const [content, setContent] = useState('');
	const config = useMemo(
		() => ({
            height: 360,
			readonly: false,
			placeholder:  'Описание товара...',
		}),
		[]
	);
    const {
        register,
        control,
        getValues,
        formState: { errors },
        watch
      } = useForm({
        defaultValues: {
            amount: 1,
            price: 10,
            isActive: true,
            productType: 0
        }
      })

    const productTypeData = watch('productType');

    const columnList = useMemo(() => {
        return [
            {
                name: "title",
                title: 'Наименование'
            },
            {
                name: "description",
                title: 'Описание '
            },
            {
                name: "amount",
                title: 'Кол-во'
            },
            {
                name: "productType",
                title: 'Тип'
            },
            {
                name: "price",
                title: 'Цена'
            },
            {
                name: "discount",
                title: 'Cкидка'
            },
            {
                name: "serverKey",
                title: 'Привязанный сервер'
            },
            {
                name: "giveCommand",
                title: 'Команда для выдачи'
            },
            {
                name: "test",
                title: <div>Редактирование товара</div>,
                renderCell: (_, {id, title}) => {
                    const handlerProductDelete = () => {
                        const deleteStatus = confirm(`Вы действительно хотите удалить ${title}`)
                        deleteStatus ? removeProduct(id) : null;
                    }
                    return <ButtonGroup>
                            <Button>Редактировать товар</Button>
                            <Button onClick={handlerProductDelete}>Удалить товар</Button>
                        </ButtonGroup>;
                },
                width: 320
            },
        ]
    }, []);
    useLayoutEffect(() => {
        getProducts()
        getCategoryType()
    }, [])

    const onSubmit = () => {
        const values = getValues();
        createProduct({
        ...values,
        isActive: values.isActive === 1 ? true: false,
        productType: Number(values.productType),
        description: content
    })
}

    return (
        <>
        <PageTitle title='Страница товаров магазина'>
            <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16} />
            <Button onClick={() => setOpen(true)} width='100%' position="center">Добавить товар</Button>
        </PageTitle>
       {data && !isLoading && <TableWrapper columnList={columnList} rowList={data}/>}
       <Modal title='Создания товара' onClose={() => setOpen(false)} isOpen={isOpen} buttonGroup={() => {
            return <Button width='120px' position='center' fontSize='16px' p='6px' onClick={() => onSubmit()}>Создать</Button>
        }}>
        <form >
            {/* <Button type="button" onClick={() => setCustomOpenModal(true)}>Выбрать стандарный товар</Button> */}
            <Controller
                name='title'
                control={control}
                render={({ field }) => (
                <InputLabelText>
                    Наименование товара
                    <Input {...field}/>
                </InputLabelText>
                )}
            />

            <Controller
                name='itemId'
                control={control}
                render={({ field }) => (
                <InputLabelText>
                    ID предмета
                    <Input {...field}/>
                </InputLabelText>
                )}
            />

            <Controller
                name='isActive'
                control={control}
                render={({ field }) => (
                <InputLabelText>
                    Cтатус
                    <Select {...field} options={[{type: 1, title: 'Включен'}, {type: 2, title: 'Выключен'}]}/>
                </InputLabelText>
                )}
            />
            <Controller
                name='amount'
                control={control}
                render={({ field }) => (
                <InputLabelText>
                    Количество
                <Input type="number" {...field}/>
            </InputLabelText>
            )
            }
            />

            <Controller
                name='productType'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Тип товара
                    <Select {...field} options={[{type: 0, title: 'Предмет'}, {type: 1, title: 'Команда'}, {type: 2, title: 'Рулетка'}, {type: 3, title: 'Набор'}, {type: 4, title: 'Чертеж'},  ]} />
                </InputLabelText>
                )}
            />
            {productTypeData == 1 && <Controller 
                name="giveCommand"
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Команда выдачи
                        <Input {...field}/>
                    </InputLabelText>
                )}
            
            />}
            <Controller 
                name='price'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Цена товара
                    <Input type="number" {...field}/>
                </InputLabelText>
            )}
            />
            {categoryStores.status === 200 && <Controller
                name='categoryType'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                        Категория товара
                    <Select {...field} options={categoryStores.data.map((item) => ({type: item.id, title: item.title}) )} />
                </InputLabelText>
                )}
            />}
            <Controller
                name='imageUrl'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Ссылка на картинку товара
                    <Input type="url" {...field}/>
                </InputLabelText>
                )}
            />
            <Controller
                name='timeout'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Время перезарядки
                    <Input type="url" {...field}/>
                </InputLabelText>
                )}
            />
            <Controller
                name='index'
                control={control}
                render={({field}) => (
                    <InputLabelText>
                    Индекс
                    <Input type='number' placeholder="Чем меньше индекс тем выше предмет в списке предметов магазина" {...field}/>
                </InputLabelText>
                )}
            />
            <InputLabelText>
            Описание товара
            <Jodit>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={(newContent) => setContent(newContent)}
                />
            </Jodit>
            </InputLabelText>
        </form>
            {customOpenModal && <DefaultProductsModal customOpenModal={customOpenModal} setCustomOpenModal={setCustomOpenModal}/>}
       </Modal>
        </>
    )
}

const ButtonGroup = styled.div`
    display: flex;
    button + button {
        margin-left: 8px;
    }
`

const Jodit = styled.div`
    margin-top: 24px;
    color: #333;
`