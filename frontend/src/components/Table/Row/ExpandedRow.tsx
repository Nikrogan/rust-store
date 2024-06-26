import { useEffect, useRef } from 'react';
import { TableRow } from '../types';
import { Transition } from './Transition';
import { ExpandedRowContent, ExpandedRowWrapper } from '../style';

type ExpandedRowProps = {
  row: TableRow;
  rowRef: React.RefObject<HTMLElement>;
};

export const ExpandedRow = ({ row, rowRef }: ExpandedRowProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWrapperHeight(row.expanded ? 'auto' : '0px');
  }, []);

  const handleExpandedMouseEnter = () => {
    rowRef.current?.classList.remove('hoverable');
  };
  const handleExpandedMouseLeave = () => {
    rowRef.current?.classList.add('hoverable');
  };

  const setWrapperHeight = (height?: string) => {
    // reading clientHeight will cause the browser to recalculate (reflow),
    // which will let animations work
    const contentHeight = (contentRef.current?.clientHeight || 0) + 'px';
    const wrapperHeight = height ?? contentHeight;

    if (wrapperRef.current) {
      wrapperRef.current.style.height = wrapperHeight;
    }
  };

  const handleTransitionEnter = () => {
    setWrapperHeight('0px');
  };
  const handleTransitionEntering = () => {
    setWrapperHeight();
  };
  const handleTransitionEntered = () => {
    setWrapperHeight('auto');
  };
  const handleTransitionExit = () => {
    setWrapperHeight();
  };
  const handleTransitionExiting = () => {
    setWrapperHeight('0px');
  };

  return (
    <Transition
      in={!!row.expanded}
      timeout={250}
      onEnter={handleTransitionEnter}
      onEntered={handleTransitionEntered}
      onEntering={handleTransitionEntering}
      onExit={handleTransitionExit}
      onExiting={handleTransitionExiting}
    >
      <ExpandedRowWrapper
        ref={wrapperRef}
        className="tr-expanded"
        onMouseEnter={handleExpandedMouseEnter}
        onMouseLeave={handleExpandedMouseLeave}
      >
        <ExpandedRowContent ref={contentRef}>{row.expandedRowRender?.(row)}</ExpandedRowContent>
      </ExpandedRowWrapper>
    </Transition>
  );
};
