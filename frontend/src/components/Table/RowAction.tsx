import * as React from 'react';
import { IconPlacement } from './IconPlacement';

type Dimension = 'xl' | 'l' | 'm' | 's';

export interface RowActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  dimension?: Dimension;
}

export const RowAction = React.forwardRef<HTMLButtonElement, RowActionProps>(({ dimension = 'm', ...props }, ref) => {
  return (
    <IconPlacement
      ref={ref}
      dimension={dimension === 's' || dimension === 'm' ? 'mBig' : 'lBig'}
      highlightFocus={false}
      {...props}
    >
      {props.children}
    </IconPlacement>
  );
});
