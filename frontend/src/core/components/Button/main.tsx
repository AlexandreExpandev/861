import React from 'react';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary A versatile button component with variants for different use cases.
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button'; // Using span for asChild to avoid button-in-button issues
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
