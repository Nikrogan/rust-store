'use client'
import { $defaultItems, getDefaultItemsEvent } from "@/app/(admin)/_api/products"
import { Button } from "@/components/Button"
import { Modal } from "@/pageComponents/Modal"
import { useUnit } from "effector-react"
import { useEffect } from "react"

export const DefaultProductsModal = ({ setCustomOpenModal, customOpenModal, onSubmit }) => {
    const getDefaultItems = useUnit(getDefaultItemsEvent);
    const defaultItems = useUnit($defaultItems)

    useEffect(() => {
        getDefaultItems()
    }, [])

    const handleSubmit = () => {
        
        onSubmit()
    }

    return (
        <Modal title="Выбор стандартного товара"  onClose={() => setCustomOpenModal(false)} isOpen={customOpenModal} buttonGroup={() => (
            <Button type='button' onClick={() => setCustomOpenModal(false)}>Выбрать</Button>
        )}>
            <div>test</div>
        </Modal>
    )
}