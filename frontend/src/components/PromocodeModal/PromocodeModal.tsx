import { Modal } from "@/pageComponents/Modal"
import { useUnit } from "effector-react"
import { activePromocodeEvent, close, store } from "./store"
import { Input } from "../form/input/Input";
import { Button } from "../Button";
import { SimpleAction } from "@/shared/utils/simpleAction";
import { useState } from "react";

export const PromocodeModal = () => {
    const {isOpen} = useUnit(store);
    const [value, setValue] = useState('');
    const onClose = useUnit(close);
    const activePromocode = useUnit(activePromocodeEvent);
    const handleSubmit = () => {
        if(value && value.length > 3) {
            activePromocode(value)
        }
    } 
    return (
    <Modal title="Активация промокода" onClose={onClose} isOpen={isOpen} buttonGroup={
        () => <Button onClick={handleSubmit} position="center" width="100%" type="submit">Активировать промокод</Button>
    }>
        <form >
            <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder="Введите промокод" />
        </form>
    </Modal>)
}

export { store };
