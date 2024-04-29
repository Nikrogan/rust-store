'use client'
import styled from "styled-components"
import { SuspectCard } from "../_components/SuspectCard"
import { Title } from "@/app/(work)/_components/Title"

const SuspectListMock = [
    {
        userName: "Долбаеб",
        steamId: 12312312312,
        lastCheck: "29.04.2024",
        reportsCount: 10
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },
    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },



        {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },    {
        userName: "Анимешник 222222222222",
        steamId: 3125423524512,
        lastCheck: "20.04.2024",
        reportsCount: 5
    },

]


export const ReportsPage = () => {
    const viewSuspectList = SuspectListMock.map(item => {
        return <SuspectCard {...item}/>
    })
    return <div>
        <Title>Страница репортов</Title>
        <SuspectContainer>
            {viewSuspectList}
        </SuspectContainer>
        </div>
}

const SuspectContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`