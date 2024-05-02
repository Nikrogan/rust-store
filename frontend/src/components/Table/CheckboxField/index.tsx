import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { keyboardKey } from '../keyboardKey';
import { passFormFieldContainerDataAttributes } from '../splitDataAttributes';
import { uid } from '../uid';
import { CheckboxComponentDimension, 
  CheckboxComponentWrapper, InputContainer, 
  CheckboxComponentHover, CheckboxComponentBackground, Indeterminate, Check, CheckboxComponentLabel, CheckboxComponentHint, 
  Input} from './style';


export interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Текст будет виден ниже компонента */
  extraText?: ReactNode;
  /** Размер компонента */
  dimension?: CheckboxComponentDimension;
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Состояние hover */
  hovered?: boolean;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      children,
      disabled = false,
      readOnly = false,
      hovered,
      dimension = 'm',
      error,
      indeterminate = false,
      extraText,
      className,
      id = uid(),
      name,
      ...props
    },
    ref,
  ) => {
    const fieldContainerProps = {
      'data-field-id': id,
      'data-field-name': name,
    } as Record<string, any>;

    passFormFieldContainerDataAttributes(props, fieldContainerProps);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (readOnly) {
        const code = keyboardKey.getCode(e);
        if (code === keyboardKey[' ']) {
          e.preventDefault();
        }
      }

      props.onKeyDown?.(e);
    };

    return (
      <CheckboxComponentWrapper
        className={className}
        $dimension={dimension}
        disabled={disabled}
        readOnly={readOnly}
        {...fieldContainerProps}
      >
        <Input
          {...props}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          type="checkbox"
          $indeterminate={indeterminate}
          onKeyDown={handleKeyDown}
          data-hovered={hovered}
          $hovered={hovered}
          $dimension={dimension}
          id={id}
          name={name}
        />
        <InputContainer $dimension={dimension}>
          <CheckboxComponentHover $dimension={dimension} />
          <CheckboxComponentBackground $dimension={dimension} $error={error} disabled={disabled || readOnly}>
            {indeterminate ? (
              <Indeterminate aria-hidden="true" focusable="false" $dimension={dimension} />
            ) : (
              <Check aria-hidden="true" focusable="false" $dimension={dimension} />
            )}
          </CheckboxComponentBackground>
        </InputContainer>
        {children && (
          <CheckboxComponentLabel $dimension={dimension} disabled={disabled}>
            {children}
            {extraText && (
              <CheckboxComponentHint disabled={disabled} $dimension={dimension}>
                {extraText}
              </CheckboxComponentHint>
            )}
          </CheckboxComponentLabel>
        )}
      </CheckboxComponentWrapper>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';
