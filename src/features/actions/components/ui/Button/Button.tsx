import { cva } from 'class-variance-authority';

import type { ButtonHTMLAttributes } from "react";

type Variant = 'primary' | 'secondary' | 'danger';
    
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    variant?: Variant;
};

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gray-900 text-white hover:bg-gray-800',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export const Button = ({ isLoading = false, variant = 'primary', children, ...props }: ButtonProps) => {
    return (
        <button 
            className={buttonStyles({ variant })}
            disabled={isLoading || props.disabled} 
            aria-busy={isLoading}
            {...props} 
        >
            {isLoading ? 'Chargement...' : children}
        </button>
    );
}