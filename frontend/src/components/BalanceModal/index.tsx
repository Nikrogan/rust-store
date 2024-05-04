import "./styled.css";
import { useUnit } from "effector-react";

import { store, close } from "./store";
import { Modal } from "@/pageComponents/Modal";
import { Button } from "../Button";
import { SimpleAction } from "@/shared/utils/simpleAction";

export const BalancaModal = () => {
    const {isOpen } = useUnit(store)
    const onClose = useUnit(close)
    
    return <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Пополнения баланса"
      buttonGroup={() => (<><Button onClick={onClose}>Отменить</Button>&nbsp;<Button onClick={SimpleAction}>Пополнить</Button></>)}    
      >
        <div>Админ бухает</div>
    </Modal>
}