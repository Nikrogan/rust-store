import { InfoLayout } from "@/components/InfoLayout/InfoLayout";
import { Flex, Text, Title } from "@mantine/core";

export default  function Contacts () {
    return <InfoLayout>
            <Title c="white">Контакты (в том числе техническая поддержка)</Title>
            <Flex bg="gray" mt={16}>
                    <Text c="white" p={8}>
                    Контакты (в том числе техническая поддержка)<br/>
                    Email: store@bwrust.ru<br/>
                    Вконтакте: https://vk.com/bw_rust<br/>
                    Discord сервер: https://discord.gg/blackwoodrust<br/>

                    Уважаемые игроки по вопросам покупки или для сообщения об нарушении правил сервиса просьба сообщать:<br/> Discord: <a href="https://discord.gg/blackwoodrust">https://discord.gg/blackwoodrust</a><br/> 
                    Обращаться в канал Ticket<br/>
                    Работаем онлайн 24/7, без привязки к адресу.  Email для коммерческих предложений. <br/>Гарантированный ответ технической поддержки в течении 24 часов
                    </Text>
            </Flex>
        </InfoLayout>
}