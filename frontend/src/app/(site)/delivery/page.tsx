import { InfoLayout } from "@/components/InfoLayout/InfoLayout";
import { Flex, Text, Title } from "@mantine/core";

export default  function Contacts () {
    return <InfoLayout>
            <Title c="white">Условия доставки</Title>
            <Flex bg="gray" mt={16}>
                    <Text c="white" p={8}>
                        Цифровой товар приобретенный с внутреннего баланса доставляется в корзину покупателя, покупатель по своему желанию забирает товар из корзины путем написания команды в чат /store находясь на сервере.  Корзина покупателя перманентная и не очищается администрацией проекта После проведения WIPE на серверах корзина не очищается, все приобретённые и\или выигранные товары остаются до момента их активации.
                    </Text>
            </Flex>
        </InfoLayout>
}