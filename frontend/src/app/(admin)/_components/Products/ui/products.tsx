'use client'
import { SimpleAction } from "@/shared/utils/simpleAction";
import { PageTitle } from "../../PageTitle";
import { useUnit } from "effector-react";
import { $products, getProductsListEvent, removeProductEvent } from "@/app/(admin)/_api/products";
import { useLayoutEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import styled from "styled-components";
import { TableWrapper } from "@/components/TableWrapper";
import { Modal } from "@/pageComponents/Modal";
import { Input, InputLabelText } from "@/components/form/input/Input";
import { Select } from "@/components/form/select";

export const Products = () => {
    const getProducts = useUnit(getProductsListEvent);
    const removeProduct = useUnit(removeProductEvent);
    const [isOpen, setOpen] = useState(false);
    const {data, isLoading} = useUnit($products);
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
    }, [])


    return (
        <>
        <PageTitle title='Страница товаров магазина'>
            <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16} />
            <Button onClick={() => setOpen(true)} width='100%' position="center">Добавить товар</Button>
        </PageTitle>
       {data && !isLoading && <TableWrapper columnList={columnList} rowList={data}/>}
       <Modal title='Создания товара' onClose={() => setOpen(false)} isOpen={isOpen} buttonGroup={() => {
            return <Button width='120px' position='center' fontSize='16px' p='6px' onClick={SimpleAction}>Создать</Button>
        }}>
        <form>
            <InputLabelText>
                Наименование товара
                <Input />
            </InputLabelText>
            <InputLabelText>
                Описание товара
                <Input />
            </InputLabelText>
            <InputLabelText>
                Тип товара
                <Input />
            </InputLabelText>
            <InputLabelText>
                Цена товара
                <Input />
            </InputLabelText>
            <InputLabelText>
                Категория товара
                <Select options={[{type: 0, title: 'Предмет'}, {type: 1, title: 'Команда'}, {type: 2, title: 'Рулетка'}, {type: 3, title: 'Набор'}, {type: 4, title: 'Чертеж'},  ]} />
            </InputLabelText>
            <InputLabelText>
                Ссылка на картинку товара
                <Input />
            </InputLabelText>
        </form>
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