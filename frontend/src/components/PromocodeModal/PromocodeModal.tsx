import { Modal } from "@/pageComponents/Modal"
import { useUnit } from "effector-react"
import { activePromocodeEvent, close, store } from "./store"
import { Input } from "../form/input/Input";
import { Button } from "../Button";
import styled from "styled-components";
import { useForm } from "@mantine/form";
import { $userStores } from "@/store/auth";

export const PromocodeModal = () => {
    const {isOpen} = useUnit(store);
    const onClose = useUnit(close);
    const activePromocode = useUnit(activePromocodeEvent);
    const form = useForm({
        initialValues: {
            promocode: '',
        },
        validate: {
            promocode: (value) => value.length > 2  ? null : 'Invalid Promocode',
          },
    });
    
    return (
    <Modal title="Активация промокода" onClose={onClose} isOpen={isOpen}>
        <form onSubmit={form.onSubmit(({promocode}) => activePromocode(promocode))}>
            <Input placeholder="Введите промокод" {...form.getInputProps('promocode')}/>
            <ButtonWrapper>
                <Button position="center" width="100%" type="submit">Активировать промокод</Button>
            </ButtonWrapper>
        </form>
    </Modal>)
}

const ButtonWrapper = styled.div`
    margin-top: 16px;
    width: 100%;
`