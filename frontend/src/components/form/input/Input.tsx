import { color } from "@/config/theme";
import styled from "styled-components"


const StyledInput = styled.input`
    background: ${color.primary};
    border: none;
    width: 100%;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 24px;
    &::placeholder {
        color: ${color.thirdly}
    }
`;

export const Input = ({ placeholder = 'Введите значение', ...props }) => <StyledInput placeholder={placeholder} {...props} />

