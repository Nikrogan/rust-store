import { useState } from "react"
import styled from "styled-components";

export const Tabs = ({defaultTabId, headerList, tabsContentList}) => {
    const [currentTab, setCurrentTab] = useState(defaultTabId);
    const viewHeader = headerList.map(item => (<item.render isActive={item.id === currentTab}  onClick={() => setCurrentTab(item.id)} {...item}/>));

    const viewContent = tabsContentList.map(item => {
        if(item.id !== currentTab) return;

        return <item.render  key={item.id} {...item} />
    });

    return <div>
        <TabsHeader>{viewHeader}</TabsHeader>
        {viewContent}
    </div>
}


const TabsHeader = styled.div`
    display: flex;
    margin-top: 24px;
    margin-bottom: 16px;
`;

