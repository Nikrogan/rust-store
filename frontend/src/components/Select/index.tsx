import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const SelectContainer = styled.div`
    position: relative;
`

const SelectTitle = styled.div`
    cursor: pointer;
`

const StyledLink = styled(Link)`
    position: relative;
    z-index: 4;
    transition: transform 0.4s;
    & + & {
        margin-top: 8px;
    }

    &:hover {
        transform: scale(1.02);
    }
`

const SelectContent = styled.div`
    position: absolute;
    width: 240px;
    display: flex;
    flex-direction: column;
    z-index: 3;
    padding: 32px 12px 0px;

    &:before {
        content: '';
        background: #1a1a1a;
        width:100%;
        height: 150px;
        position: absolute;
        top: 20px;
        z-index: -1;
        left: 0;
    };
`

export const Select = ({children, options}) => {
    const [isShownHoverContent, setIsShownHoverContent] = useState(false);

    return <SelectContainer 
    onMouseEnter={() => setIsShownHoverContent(true)}
    onMouseLeave={() => setIsShownHoverContent(false)}>
        <SelectTitle>{children}</SelectTitle>
        {isShownHoverContent && (
            <SelectContent>
                {options.map(item => {
                    return <StyledLink key={item.href} href={item.href}>{item.title}</StyledLink>
                })}
            </SelectContent>
        )
        }
    </SelectContainer>
}