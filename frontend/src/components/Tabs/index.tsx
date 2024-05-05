import { color } from "@/config/theme";
import React, { ReactNode, memo, useState } from "react"
import styled from "styled-components";

type HeaderItem = {
    id: string;
    render: ({isActive, onClick}: {isActive: boolean, onClick: () => void}) => ReactNode;
}

type Content = {
    id: string;
    render: ({isActive, onClick}: {isActive: boolean, onClick: () => void}) => ReactNode;
}

type TabsProps = {
    defaultTabId: string;
    headerList: HeaderItem[],
    tabsContentList: Content[]
}

export const Tabs = memo(({defaultTabId, headerList, tabsContentList}: TabsProps) => {
    const [currentTab, setCurrentTab] = useState(defaultTabId);
    const viewHeader = headerList.map((item, i) => (<item.render key={item.id + i} isActive={item.id === currentTab}  onClick={() => setCurrentTab(item.id)} {...item}/>));

    const viewContent = tabsContentList.map(item => {
        if(item.id !== currentTab) return;

        return <item.render  key={item.id} {...item} />
    });

    return <div>
        <TabsHeader>{viewHeader}</TabsHeader>
        {viewContent}
    </div>
})


const TabsHeader = styled.div`
    display: flex;
    margin-top: 24px;
    margin-bottom: 16px;
    background: ${color.secondary}
`;



export const TabButton = styled.button`
    padding: 0 16px;
    display: flex;
    align-items: center;
    height: 44px;
    cursor: pointer;
    color: ${() => 'white'};
    ${({isActive}) => isActive ? `border-bottom: 1px solid ${color.accent}`: null}
`

export const TabButtonText = styled.div`
    margin-right: 8px;
`