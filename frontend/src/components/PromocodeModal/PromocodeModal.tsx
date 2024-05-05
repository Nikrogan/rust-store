import { Modal } from "@/pageComponents/Modal"
import { useUnit } from "effector-react"
import { activePromocodeEvent, close, store } from "./store"
import { Input } from "../form/input/Input";
import { Button } from "../Button";
import { SimpleAction } from "@/shared/utils/simpleAction";

export const PromocodeModal = () => {
    const {isOpen} = useUnit(store);
    const onClose = useUnit(close);
    const activePromocode = useUnit(activePromocodeEvent);
    
    return (
    <Modal title="Активация промокода" onClose={onClose} isOpen={isOpen} buttonGroup={
        () => <Button position="center" width="100%" type="submit">Активировать промокод</Button>
    }>
        <form onSubmit={SimpleAction}>
            <Input placeholder="Введите промокод" />
        </form>
    </Modal>)
}

export { store };
