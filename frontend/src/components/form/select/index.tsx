import { color } from "@/config/theme";
import styled from "styled-components";

const StyledSelect = styled.select`
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

export const Select = ({options}) => <StyledSelect>{options.map((el) => <option value={el.type}>{el.title}</option>)}</StyledSelect>