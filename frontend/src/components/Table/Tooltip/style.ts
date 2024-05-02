import styled from 'styled-components';
import { TooltipDimension } from '.';
import { PositionInPortal } from '../PositionInPortal';
import { typography } from '../Typography';
import { parseShadow } from '../parseShadowFromTheme';
import { color } from '@/config/theme';

const TOOLTIP_PADDING_M = '4px 8px';
const TOOLTIP_PADDING_S = '2px 6px';

export const TooltipWrapper = styled.div`
  box-sizing: border-box;
  opacity: 0;
  transition-delay: 200ms;
  transition-property: opacity;
  align-self: center;
  width: max-content;
  min-width: max-content;
  pointer-events: initial;
`;

export const TooltipContainer = styled.div<{ $dimension?: TooltipDimension }>`
  box-sizing: border-box;
  background-color: ${color.primary};
  color: ${color.primary};
  border-radius: 8px;
  padding: ${(p) => (p.$dimension === 'm' ? TOOLTIP_PADDING_M : TOOLTIP_PADDING_S)};
  max-width: min(488px, calc(100vw - 16px));
  overflow-wrap: break-word;
`;

export const FakeTarget = styled.div`
  pointer-events: none;
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
`;

export const Portal = styled(PositionInPortal)<{ $flexDirection?: any }>`
  display: flex;
  flex-wrap: nowrap;
  ${({ $flexDirection }) => ($flexDirection ? `flex-direction: ${$flexDirection};` : '')}
  z-index: 2;
`;
