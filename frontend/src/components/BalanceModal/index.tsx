import "./styled.css";
import { useUnit } from "effector-react";

import { store, close, getPaymentServicesEvent, $paymentServices, createPaymentEvent, $loading } from "./store";
import { Modal } from "@/pageComponents/Modal";
import { Button } from "../Button";
import { SimpleAction } from "@/shared/utils/simpleAction";
import { Controller, useForm } from "react-hook-form";
import { Select } from "../form/select";
import { useEffect, useState } from "react";
import { Input, InputLabel, InputLabelText } from "../form/input/Input";
import { $lang } from "@/store/lang";
import { BalanceLang } from './lang';
import styled from "styled-components";
import { Loader } from "../loader";

export const BalanceModal = () => {
    const [amount, setAmount] = useState(0);
    const [isPaypal, setPaypalStatus] = useState(false);
    const isLoadingCreateRequst = useUnit($loading) 
    const getPaymentServices = useUnit(getPaymentServicesEvent);
    const createPayment = useUnit(createPaymentEvent)
    const {currentLang} = useUnit($lang)
    const {data, isLoading} = useUnit($paymentServices)
    const {isOpen} = useUnit(store)
    const onClose = useUnit(close)
    const { control, getValues, } = useForm({
      defaultValues: {
        paymentKey: 'custom_paypal'
      }
    });

    useEffect(() => {
      if(isOpen) {
        getPaymentServices()
      }
    }, [isOpen])

    const handleCreatePayment = () => {
        const {paymentKey, amount} = getValues();
        if(!paymentKey || !amount) {
          SimpleAction();
          return;
        }
        createPayment({
          paymentServiceKey: paymentKey,
          amount
        })
    }

    return <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Пополнения баланса"
      buttonGroup={() => (<><Button onClick={onClose}>{BalanceLang[currentLang].Cancel}</Button>&nbsp;<Button onClick={handleCreatePayment}>{BalanceLang[currentLang].TopUp}</Button></>)}    
      >
        {isLoadingCreateRequst && <Loader />}
        {!isLoadingCreateRequst && <form>
          <Controller
            name='paymentKey'
            control={control}
            render={({field}) => {
              return (
              <InputLabelText>
                {BalanceLang[currentLang].SelectPaymentMethod}
              <Select {...field} onChange={(data) => {
                if(data.target.value === 'custom_paypal') {
                  setPaypalStatus(true)
                } else {
                  setPaypalStatus(false)
                }
                field.onChange(data)
              }} options={data ? data.map(({paymentServiceKey, displayName}) => {
                return {
                  type: paymentServiceKey,
                  title: displayName
                }
              }) : []}/>
                </InputLabelText>
              )
            }}
          />
            <Controller
                name='amount'
                control={control}
                render={({ field }) => (
                <InputLabelText>
                  Cумма платежа
                  <Input {...field} min={0} onChange={(data: any) => {
                    setAmount(data.target.value)
                    field.onChange(data)
                  }} placeholder="Введите сумму" type="number" />
                </InputLabelText>
              )
            }
            />
            {!!amount && <StyledCalc>
              <div>
                Будет начислено: { isPaypal ? Number(amount) * 90 : amount } <BW>BW COINS</BW>
              </div>
            </StyledCalc>}
        </form>}
    </Modal>
}

const StyledCalc = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`

const BW = styled.div`
  font-weight: 800;
  display: inline;
`