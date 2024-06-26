import { PropsWithChildren } from "react";
import styled from "styled-components"


const StyledButton = styled.button`
    padding: ${({p}) => p ? p : '10px'};
    background: #7950F2;
    display: flex;
    align-items: center;
    font-size: ${({fontSize}) => fontSize ? fontSize : '14px'};
    width: ${({ width }) => width ? width : 'auto' };
    justify-content: ${({position}) => position ? position : 'auto'};
    transition: transform 0.4s;
    border: none;
    cursor: pointer;
    color: white;

    &:hover {
        transform: scale(1.02);
    }
`

const StyledRightElement = styled.div`
    margin-left: 12px;
`

type ButtonProps = PropsWithChildren<{
    onClick?: () => void;
    RightElement?: React.ElementType;
}>

export const Button = ({children, onClick, RightElement, ...rest}: ButtonProps) => {
    return <StyledButton onClick={onClick} {...rest}>
        {children}
        {RightElement && (
            <StyledRightElement>
                <RightElement/>
            </StyledRightElement>
        )
        }
    </StyledButton>
}