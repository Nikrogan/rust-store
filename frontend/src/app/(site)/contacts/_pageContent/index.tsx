'use client'
import { color } from "@/config/theme"
import styled from "styled-components"

export const PageContent = () => {
    return (
        <><h1>Контакты (в том числе техническая поддержка)</h1><Container>
            <Text>
                Уважаемые игроки по вопросам покупки или для сообщения об нарушении правил сервиса просьба сообщать:<br />
                <DiscordLinkContainer>Discord:
                    <DiscortLink href="https://discord.gg/blackwoodrust">BW RUST</DiscortLink>
                </DiscordLinkContainer><br />
                Обращаться в канал Ticket<br />
                Работаем онлайн 24/7, без привязки к адресу. <br />
                Гарантированный ответ технической поддержки в течениe 24 часов.
            </Text>
        </Container></>
    )
}

const Container = styled.div`
  background: ${color.secondary};
  display: flex;
  margin-top: 16px;
`

const Text  = styled.div`
    font-size: 16px;
    padding: 8px;
`

const DiscortLink = styled.a`
  color: ${color.accent};
  padding-left: 6px;
`

const DiscordLinkContainer = styled.div`
display: flex;
`