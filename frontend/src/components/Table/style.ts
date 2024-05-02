import styled, { css } from 'styled-components';

import {
  cellStyle,
  disabledRow,
  extraTextStyle,
  groupRowStyle,
  multiLineTitle,
  overflowMenuStyle,
  rowBackground,
  rowStyle,
  singleLineTitle,
  underlineRow,
} from './mixins';
import { ResizerWrapper } from './RowWidthResizer';
import { TableProps, TableRow } from './types';
import { IconPlacement } from './IconPlacement';
import { typography } from './Typography';
import { ArrowUpOutline } from './icons/ArrowUpOutline';
import { ChevronDownOutline } from './icons/ChevronDownOutline';
import { DragOutline } from './icons/DragOutline';
import { parseShadow } from './parseShadowFromTheme';
import { color } from '@/config/theme';

// устанавливаем  pointer-events: none для ResizerWrapper во время drag&drop столбцов, так как ResizerWrapper
// располагается прямо между соседними столбцами, и это мешает правильно рассчитать то, над каким столбцом находится курсор
export const TableContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &[data-dragging='true'] ${ResizerWrapper} {
    pointer-events: none;
  }
`;

export const StickyGroupRow = styled.div`
  display: flex;
  position: sticky;
  left: 0;
  z-index: 5;
`;

export const StickyWrapper = styled(StickyGroupRow)<{ $greyHeader?: boolean }>`
  transition: box-shadow 0.3s;

`;

export const NormalWrapper = styled.div`
  display: flex;
`;

export const OverflowMenuWrapper = styled.div<{
  $offset: number;
  $dimension: TableProps['dimension'];
  $showRowsActions?: boolean;
}>`
  will-change: margin-left;
  transform: translate3d(0, 0, 0);
  ${overflowMenuStyle};

  ${({ $showRowsActions }) =>
    !$showRowsActions &&
    css`
      visibility: hidden;
      &:hover {
        visibility: visible;
      }
    `}
`;

export const Filler = styled.div`
  display: flex;
  flex: 1 1 auto;
  width: unset;
`;

export const HeaderWrapper = styled.div<{ $scrollbar: number; $greyHeader?: boolean }>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;

  &[data-verticalscroll='true'] {
    &:after {
      position: absolute;
      content: '';
      box-sizing: border-box;
      top: 0;
      right: 0;
      height: 100%;
      width: ${({ $scrollbar }) => $scrollbar}px;
    }
    & > div.tr {
      overflow-y: scroll;
    }
  }

  ${({ $greyHeader }) =>
    $greyHeader &&
    css`
      & > div.tr {
        background: var(--admiral-color-Neutral_Neutral05, ${(p) => p.theme.color['Neutral/Neutral 05']});
      }
    `}
`;

export const Header = styled.div<{ $dimension: TableProps['dimension'] }>`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  overflow-x: hidden;

  & > * {
    border-bottom: 1px solid red;
  }
`;

export const ScrollTableBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 auto;
`;

export const ExpandIcon = styled(ChevronDownOutline)<{ $isOpened?: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: rotate(${(p) => (p.$isOpened ? 180 : 0)}deg);
`;

export const ExpandIconPlacement = styled(IconPlacement)`
  margin: 0;
  flex-shrink: 0;
`;

export const SortIconWrapper = styled.div`
  position: relative;
`;

export const SortIcon = styled(ArrowUpOutline)<{ $sort: 'asc' | 'desc' | 'initial' }>`
  display: flex;
  flex-shrink: 0;
  transition: transform 0.3s ease-in-out;
  transform: rotate(0deg);
  margin: 2px 0;

  & *[fill^='#'] {
    fill: ${({ theme, $sort }) =>
      $sort === 'initial'
        ? 'transparent'
        : `var(--admiral-color-Primary_Primary60Main, ${theme.color['Primary/Primary 60 Main']})`};
  }
  ${({ $sort }) => ($sort === 'desc' ? 'transform: rotate(180deg);' : '')}
`;

export const SortOrder = styled.div`
  position: absolute;
  top: 1px;
  right: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 9px;
  font-feature-settings:
    'tnum' on,
    'lnum' on;
`;

export const DragIcon = styled(DragOutline)<{ $disabled?: boolean }>`
  display: flex;
  flex-shrink: 0;
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  & *[fill^='#'] {
    fill: ${({ theme, $disabled }) =>
      $disabled
        ? `var(--admiral-color-Neutral_Neutral30, ${theme.color['Neutral/Neutral 30']})`
        : `var(--admiral-color-Neutral_Neutral50, ${theme.color['Neutral/Neutral 50']})`};
  }
`;

export const Cell = styled.div<{ $dimension: TableProps['dimension'] }>`
  display: flex;
  align-items: flex-start;
  flex: 0 0 auto;
  box-sizing: border-box;
  ${cellStyle};
  overflow: hidden;
`;

export const CellTextContent = styled.div<{ $cellAlign?: 'left' | 'right' }>`
  display: block;
  align-items: center;
  width: 100%;
  margin: 2px 0;
  ${({ $cellAlign }) => $cellAlign === 'right' && 'text-align: right;'}
  overflow: hidden;
`;

export const GroupTextContent = styled.div`
  display: block;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

// padding-bottom меньше padding-top на 1px, т.к. 1px остается для border-bottom ячейки
export const CheckboxCell = styled(Cell)<{ $dimension: TableProps['dimension'] }>`
  width: ${({ $dimension }) => ($dimension === 's' || $dimension === 'm' ? 44 : 56)}px;
  padding: ${({ $dimension }) => {
    switch ($dimension) {
      case 's':
        return '6px 12px 5px 12px';
      case 'l':
        return '12px 16px 11px 16px';
      case 'xl':
        return '16px 16px 15px 16px';
      case 'm':
      default:
        return '10px 12px 9px 12px';
    }
  }};
`;

// padding-bottom меньше padding-top на 1px, т.к. 1px остается для border-bottom ячейки
export const ExpandCell = styled(Cell)<{ $dimension: TableProps['dimension'] }>`
  width: ${({ $dimension }) => ($dimension === 's' || $dimension === 'm' ? 44 : 56)}px;
  padding: ${({ $dimension }) => {
    switch ($dimension) {
      case 's':
        return '6px 12px 5px 12px';
      case 'l':
        return '12px 16px 11px 16px';
      case 'xl':
        return '16px 16px 15px 16px';
      case 'm':
      default:
        return '10px 12px 9px 12px';
    }
  }};
`;

// padding-bottom меньше padding-top на 1px, т.к. 1px остается для border-bottom ячейки
export const DragCell = styled(Cell)<{ $dimension: TableProps['dimension'] }>`
  width: ${({ $dimension }) => ($dimension === 's' || $dimension === 'm' ? 36 : 48)}px;
  padding: ${({ $dimension }) => {
    switch ($dimension) {
      case 's':
        return '6px 8px 5px 8px';
      case 'l':
        return '12px 12px 11px 12px';
      case 'xl':
        return '16px 12px 15px 12px';
      case 'm':
      default:
        return '10px 8px 9px 8px';
    }
  }};
`;

export const HeaderCell = styled.div<{ $dimension: TableProps['dimension'] }>`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  flex: 0 0 auto;
  ${cellStyle}
  &:hover {
    cursor: pointer;
  }
  align-items: flex-start;
`;

export const HeaderCellContent = styled.div<{ $cellAlign: 'left' | 'right' }>`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${({ $cellAlign }) =>
    $cellAlign === 'right' &&
    css`
      flex-direction: row-reverse;
      & > ${HeaderCellTitle} {
        text-align: right;
        flex-direction: row-reverse;
      }
    `}
`;

export const HeaderCellSpacer = styled.div<{ width?: string }>`
  display: flex;
  align-self: stretch;
  width: ${(p) => (p.width ? p.width : '12px')};
  flex-shrink: 0;
`;

export const HeaderCellTitle = styled.div<{ $sort: 'asc' | 'desc' | 'initial' }>`
  display: inline-flex;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  &:hover {
  }
`;

export const TitleContent = styled.div<{ $dimension: TableProps['dimension']; $sortable?: boolean }>`
  display: flex;
  flex-direction: column;

  // leave 20px/16px for SortIcon
  max-width: ${({ $sortable, $dimension }) =>
    $sortable ? `calc(100% - ${$dimension === 's' || $dimension === 'm' ? 16 : 20}px)` : '100%'};
`;

export const Title = styled.div<{ $lineClamp: number }>`
  position: relative;
  width: 100%;
  ${({ $lineClamp }) => ($lineClamp === 1 ? singleLineTitle : multiLineTitle)}
`;

export const ExtraText = styled.div<{ $dimension: TableProps['dimension']; $lineClamp: number }>`
  position: relative;
  width: 100%;
  margin: 2px 0;
  ${extraTextStyle}
  ${({ $lineClamp }) => ($lineClamp === 1 ? singleLineTitle : multiLineTitle)}
`;

const rowWidthStyle = css<{ $rowWidth?: number }>`
  width: ${(p) => `${p.$rowWidth}px`};
`;

const rowHoverMixin = css`
  cursor: pointer;
  & > .tr-simple > *,
  & ${OverflowMenuWrapper} {
    background: var(--admiral-color-Primary_Primary10, ${(p) => p.theme.color['Primary/Primary 10']});
  }
`;

const groupRowHoverMixin = css`
  &[data-groupover='true'] > .tr-simple > *,
  & ${OverflowMenuWrapper} {
    background: black;
  }
`;

export const Row = styled.div<{
  $dimension: TableProps['dimension'];
  $underline: boolean;
  disabled?: boolean;
  $isGroup?: boolean;
  $rowWidth?: number;
  $hover?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  background: orange;
  ${(p) => (p.$isGroup ? groupRowStyle : rowStyle)}
  ${({ disabled }) => disabled && disabledRow}
  ${({ $underline }) => $underline && underlineRow}
  ${({ $rowWidth }) => $rowWidth && rowWidthStyle}
   &:hover:is(.hoverable) {
    ${({ $hover, disabled }) => $hover && !disabled && rowHoverMixin}
  }

  &[data-dragover='true'] > * {
    opacity: 0.4;
  }
  transition: opacity 0.3 ease;

  ${groupRowHoverMixin}
`;

export const SimpleRow = styled.div<{
  $showRowsActions: boolean;
  selected?: boolean;
  disabled?: boolean;
  $error?: boolean;
  $success?: boolean;
  $grey?: boolean;
  $status?: TableRow['status'];
  $rowStatusMap?: TableProps['rowBackgroundColorByStatusMap'];
}>`
  display: inline-flex;
  min-width: max-content;

  & > *,
  & + ${OverflowMenuWrapper} {
    background: ${rowBackground};
  }

  ${({ $showRowsActions }) =>
    !$showRowsActions &&
    css`
      &:hover {
        & + ${OverflowMenuWrapper} {
          visibility: visible;
        }
      }
      & + div[data-opened='true'] {
        visibility: visible;
      }
    `}
`;

export const ExpandedRowWrapper = styled.div`
  display: inline-flex;
  overflow: hidden;
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ExpandedRowContent = styled.div`
  display: flex;
  flex: 1 0 auto;
  height: fit-content;
  box-sizing: border-box;
  padding: 0 12px 11px 12px;
`;

export const EmptyMessage = styled(Cell)`
  margin: 2px 0;
  color: indigo;
`;

const getTechColumnsWidth = (
  dimension: TableProps['dimension'],
  selectionCol?: boolean,
  expansionCol?: boolean,
): number =>
  (selectionCol ? (dimension === 's' || dimension === 'm' ? 44 : 56) : 0) +
  (expansionCol ? (dimension === 's' || dimension === 'm' ? 44 : 56) : 0);

export const HeaderCellsWrapper = styled.div<{
  $dimension: TableProps['dimension'];
  $selectionColumn?: boolean;
  $expansionColumn?: boolean;
}>`
  display: flex;
  flex: 0 0 auto;
  width: calc(100% - ${(p) => getTechColumnsWidth(p.$dimension, p.$selectionColumn, p.$expansionColumn) + 'px'});
`;

export const HiddenHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  visibility: hidden;
  display: flex;
  overflow: hidden;

  &[data-verticalscroll='true'] {
    overflow-y: scroll;
  }
`;

export const MirrorColumn = styled(HeaderCell)<{ $dimension: TableProps['dimension'] }>`
  position: fixed;
  z-index: 6;
  visibility: hidden;
  display: flex;
  max-width: 200px;
  ${({ $dimension }) =>
    $dimension === 's' || $dimension === 'm' ? typography['Subtitle/Subtitle 3'] : typography['Subtitle/Subtitle 2']}
  padding-left: ${({ $dimension }) => ($dimension === 's' || $dimension === 'm' ? 36 : 40)}px;

  &[data-cursor='normal'] {
    cursor: grabbing;
  }
  &[data-cursor='error'] {
    cursor: not-allowed;
  }

  & > [data-title] {
    ${singleLineTitle}
  }
`;

export const MirrorRow = styled.div<{ $dimension: TableProps['dimension'] }>`
  position: fixed;
  z-index: 6;
  visibility: hidden;
  display: flex;
  align-items: center;
  max-width: 288px;
  background: ${color.primary};
  padding-left: ${({ $dimension }) => ($dimension === 's' || $dimension === 'm' ? 36 : 48)}px;
  ${rowStyle}

  &[data-cursor='normal'] {
    cursor: grabbing;
  }
  &[data-cursor='error'] {
    cursor: not-allowed;
  }
`;
