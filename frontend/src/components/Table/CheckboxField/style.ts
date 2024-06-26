import styled, { css } from 'styled-components';
import { typography } from '../Typography';
import { Minus } from '../icons/Minus';
import { Success } from '../icons/Success';
import { color } from '@/config/theme';

const DIMENSION_M = 24;
const DIMENSION_S = 20;
const FOCUS_OFFSET = 2;
const FOCUS_BORDER_WIDTH = 2;
const LABEL_MARGIN = '8px';

/** Размеры компонента */
export type CheckboxComponentDimension = 'm' | 's';

export const CheckboxComponentWrapper = styled.label<{
  $dimension: CheckboxComponentDimension;
  disabled?: boolean;
  readOnly?: boolean;
}>`
  display: inline-flex;
  align-items: flex-start;
  position: relative;
  box-sizing: content-box;
  padding: 0;
  user-select: none;

  cursor: ${(p) => (p.disabled ? 'not-allowed' : p.readOnly ? 'default' : 'pointer')};

  ${(p) => (p.$dimension === 's' ? typography['Body/Body 2 Short'] : typography['Body/Body 1 Short'])}
  color: ${(p) =>
    p.disabled
      ? `var(--admiral-color-Neutral_Neutral30, ${p.theme.color['Neutral/Neutral 30']})`
      : `var(--admiral-color-Neutral_Neutral90, ${p.theme.color['Neutral/Neutral 90']})`};

  fieldset[data-dimension='s'] && {
    ${typography['Body/Body 2 Short']};
  }
  fieldset:disabled && {
    color: var(--admiral-color-Neutral_Neutral30, ${(p) => p.theme.color['Neutral/Neutral 30']});
    cursor: not-allowed;
  }

  ${(p) => (p.readOnly ? `pointer-events: none` : '')};
`;

const readOnlyCss = css`
  pointer-events: none;
  cursor: default;

  &:not(:checked) {
    & + div > span {
      border-color: var(--admiral-color-Neutral_Neutral30, ${(p) => p.theme.color['Neutral/Neutral 30']});
      background-color: var(--admiral-color-Neutral_Neutral10, ${(p) => p.theme.color['Neutral/Neutral 10']});
    }
  }

  &:checked {
    & + div > span {
      border-color: var(--admiral-color-Primary_Primary30, ${(p) => p.theme.color['Primary/Primary 30']});
      background-color: var(--admiral-color-Primary_Primary30, ${(p) => p.theme.color['Primary/Primary 30']});
      & *[fill^='#'] {
        fill: var(--admiral-color-Neutral_Neutral00, ${(p) => p.theme.color['Neutral/Neutral 00']});
      }
      & > svg {
        visibility: visible;
      }
    }
  }
`;

const indeterminateCss = css`
  &:not(:checked) + div > span {
    border-color: var(--admiral-color-Primary_Primary60Main, ${(p) => p.theme.color['Primary/Primary 60 Main']});
    background-color: var(--admiral-color-Primary_Primary60Main, ${(p) => p.theme.color['Primary/Primary 60 Main']});
  }
  > * {
    display: block;
  }
`;

const hoveredCss = css`
  &:not(:disabled) {
    & + div > div {
      visibility: visible;
    }
    &:focus-visible + div {
      outline: none;
    }
  }
`;

const activeCss = css`
  &:not(:disabled) {
    ${hoveredCss}
    & + div > div {
      background: var(--admiral-color-Opacity_Press, ${(p) => p.theme.color['Opacity/Press']});
    }
  }
`;

export const Input = styled.input<{
  $dimension: CheckboxComponentDimension;
  $indeterminate?: boolean;
  $hovered?: boolean;
}>`
  appearance: none;
  ::-ms-check {
    display: none;
  }
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  opacity: 0;

  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;

    &:not(:checked) {
      & + div > span {
        border-color: var(--admiral-color-Neutral_Neutral30, ${(p) => p.theme.color['Neutral/Neutral 30']});
        background-color: var(--admiral-color-Neutral_Neutral10, ${(p) => p.theme.color['Neutral/Neutral 10']});
      }
    }

    &:checked {
      & + div > span {
        border-color: var(--admiral-color-Primary_Primary30, ${(p) => p.theme.color['Primary/Primary 30']});
        background-color: var(--admiral-color-Primary_Primary30, ${(p) => p.theme.color['Primary/Primary 30']});
        & *[fill^='#'] {
          fill: var(--admiral-color-Neutral_Neutral00, ${(p) => p.theme.color['Neutral/Neutral 00']});
        }
        & > svg {
          visibility: visible;
        }
      }
    }
  }

  &:checked:not(:disabled) {
    & + div > span {
      border-color: var(--admiral-color-Primary_Primary60Main, ${(p) => p.theme.color['Primary/Primary 60 Main']});
      background-color: var(--admiral-color-Primary_Primary60Main, ${(p) => p.theme.color['Primary/Primary 60 Main']});
      & *[fill^='#'] {
        fill: var(--admiral-color-Special_StaticWhite, ${(p) => p.theme.color['Special/Static White']});
      }
      & > svg {
        visibility: visible;
      }
    }
  }

  ${(p) => !p.readOnly && p.$hovered && hoveredCss}

  &:not(:disabled) {
    &:focus-visible + div {
      outline-offset: ${FOCUS_OFFSET}px;
      outline: var(--admiral-color-Primary_Primary60Main, ${(p) => p.theme.color['Primary/Primary 60 Main']}) solid
        ${FOCUS_BORDER_WIDTH}px;
    }

    &:hover {
      ${(p) => !p.readOnly && hoveredCss}
    }
    &:active {
      ${(p) => !p.readOnly && activeCss}
    }

    ${(p) => p.$indeterminate && indeterminateCss};
    ${(p) => p.readOnly && readOnlyCss};
  }
`;

export const InputContainer = styled.div<{ $dimension: CheckboxComponentDimension }>`
  box-sizing: border-box;
  padding: 2px;
  pointer-events: none;
  position: relative;
  flex-shrink: 0;
  ${(p) => `
    width: ${p.$dimension === 's' ? DIMENSION_S : DIMENSION_M}px;
    height: ${p.$dimension === 's' ? DIMENSION_S : DIMENSION_M}px;
  `}
  fieldset[data-dimension='s'] & {
    width: ${DIMENSION_S}px;
    height: ${DIMENSION_S}px;
  }
`;

export const CheckboxComponentHover = styled.div<{ $dimension: CheckboxComponentDimension }>`
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  background: var(--admiral-color-Opacity_Hover, ${(p) => p.theme.color['Opacity/Hover']});
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  ${(p) => `
        width: ${p.$dimension === 's' ? 32 : 36}px;
        height: ${p.$dimension === 's' ? 32 : 36}px;
      `}
  background-color: var(--admiral-color-Opacity_Hover, ${(p) => p.theme.color['Opacity/Hover']});

  fieldset[data-dimension='s'] && {
    width: 32px;
    height: 32px;
  }
`;

export const CheckboxComponentBackground = styled.span<{
  $error?: boolean;
  $dimension: CheckboxComponentDimension;
  disabled: boolean;
}>`
  box-sizing: border-box;
  pointer-events: none;
  display: inline-block;
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  ${(p) => `
    width: ${p.$dimension === 's' ? 16 : 20}px;
    height: ${p.$dimension === 's' ? 16 : 20}px;
  `}
  outline: 0;
  transition: background 0.1s ease-in;

  fieldset[data-dimension='s'] && {
    width: 16px;
    height: 16px;
  }

  /* disable inheritance from parent elements */
  line-height: initial;
  background-color: ${color.primary};
  border: 1px solid
    ${(p) =>
      p.$error
        ? `var(--admiral-color-Error_Error60Main, ${p.theme.color['Error/Error 60 Main']})`
        : `var(--admiral-color-Neutral_Neutral50, ${p.theme.color['Neutral/Neutral 50']})`};
  & *[fill^='#'] {
    fill: ${(p) =>
      p.disabled
        ? `var(--admiral-color-Neutral_Neutral10, ${p.theme.color['Neutral/Neutral 10']})`
        : `var(--admiral-color-Neutral_Neutral00, ${p.theme.color['Neutral/Neutral 00']})`};
  }
  fieldset:disabled && {
    & *[fill^='#'] {
      fill: var(--admiral-color-Neutral_Neutral10, ${(p) => p.theme.color['Neutral/Neutral 10']});
    }
  }
`;

const iconCss = css<{ $dimension: CheckboxComponentDimension }>`
  ${(p) => `
    width: ${p.$dimension === 's' ? 16 : 20}px;
    height: ${p.$dimension === 's' ? 16 : 20}px;
  `}
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const Check = styled(Minus)<{ $dimension: CheckboxComponentDimension }>`
  visibility: hidden;
  ${iconCss}
`;

export const Indeterminate = styled(Success)<{ $dimension: CheckboxComponentDimension }>`
  ${iconCss}
  & *[fill^='#'] {
    fill: var(--admiral-color-Special_StaticWhite, ${(p) => p.theme.color['Special/Static White']});
  }
`;
export const CheckboxComponentLabel = styled.div<{
  $dimension: CheckboxComponentDimension;
  disabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: ${LABEL_MARGIN};
  ${(p) => (p.$dimension === 's' ? typography['Body/Body 2 Short'] : typography['Body/Body 1 Short'])}
  color: ${(p) =>
    p.disabled
      ? `var(--admiral-color-Neutral_Neutral30, ${p.theme.color['Neutral/Neutral 30']})`
      : `var(--admiral-color-Neutral_Neutral90, ${p.theme.color['Neutral/Neutral 90']})`};
  fieldset:disabled && {
    color: var(--admiral-color-Neutral_Neutral30, ${(p) => p.theme.color['Neutral/Neutral 30']});
  }
  fieldset[data-dimension='s'] && {
    ${typography['Body/Body 2 Short']}
  }
`;

export const CheckboxComponentHint = styled.div<{ $dimension: CheckboxComponentDimension; disabled?: boolean }>`
  margin-top: 4px;
  ${(p) => (p.$dimension === 's' ? typography['Caption/Caption 1'] : typography['Body/Body 2 Short'])}
  color: ${(p) =>
    p.disabled
      ? `var(--admiral-color-Neutral_Neutral30, ${p.theme.color['Neutral/Neutral 30']})`
      : `var(--admiral-color-Neutral_Neutral50, ${p.theme.color['Neutral/Neutral 50']})`};

  fieldset[data-dimension='s'] && {
    ${typography['Caption/Caption 1']}
  }
`;
