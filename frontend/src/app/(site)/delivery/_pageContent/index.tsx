'use client'
import { color } from "@/config/theme"
import styled from "styled-components"

export const PageContent = () => (
    <>
    <h1>Условия доставки</h1><Container>
        <Text>
            Цифровой товар приобретенный с внутреннего баланса доставляется в корзину покупателя, <br/>
            покупатель по своему желанию забирает товар из корзины путем написания команды в чат /store находясь на сервере.<br/>
            Корзина покупателя перманентная и не очищается администрацией проекта.<br/>
            После проведения WIPE на серверах корзина не очищается, все приобретённые и\или выигранные товары остаются до момента их активации.
        </Text>
    </Container>
    </>
)

const Container = styled.div`
  background: ${color.secondary};
  display: flex;
  margin-top: 16px;
`

const Text = styled.div`
    font-size: 16px;
    padding: 8px;
`
