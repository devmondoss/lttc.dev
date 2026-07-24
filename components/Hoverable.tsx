'use client';

import { useState, type CSSProperties, type ElementType, type ComponentPropsWithoutRef } from 'react';

type OwnProps<T extends ElementType> = {
  as?: T;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
};

type Props<T extends ElementType> = OwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

/** Equivalente al atributo `style-hover` del dc-runtime original: aplica un
 * segundo set de estilos inline en hover/foco, sin depender de CSS externo. */
export default function Hoverable<T extends ElementType = 'a'>({
  as,
  style,
  hoverStyle,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: Props<T>) {
  const [active, setActive] = useState(false);
  const Comp = (as || 'a') as ElementType;
  const merged = active && hoverStyle ? { ...style, ...hoverStyle } : style;

  return (
    <Comp
      style={merged}
      onMouseEnter={(e: React.MouseEvent) => {
        setActive(true);
        (onMouseEnter as any)?.(e);
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        setActive(false);
        (onMouseLeave as any)?.(e);
      }}
      onFocus={(e: React.FocusEvent) => {
        setActive(true);
        (onFocus as any)?.(e);
      }}
      onBlur={(e: React.FocusEvent) => {
        setActive(false);
        (onBlur as any)?.(e);
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
