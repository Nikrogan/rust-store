import { color } from "@/config/theme";
import styled from "styled-components"


const StyledInput = styled.input`
    background: ${color.primary};
    border: none;
    width: 100%;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 16px;
    &::placeholder {
        color: ${color.thirdly}
    }
`;

export const InputLabel = styled.label`

`

export const InputLabelText = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
`

export const Input = ({ placeholder = 'Введите значение', ...props }) => <StyledInput placeholder={placeholder} {...props} />

