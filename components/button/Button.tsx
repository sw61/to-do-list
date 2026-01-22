import React from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'items-center justify-center flex shrink-0 transition-all duration-100 active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-50 border-2 border-slate-900',
  {
    variants: {
      variant: {
        add: 'h-14 w-[168px] gap-2 rounded-3xl text-16-bold drop-shadow-button',
        delete: 'h-14 w-[168px] gap-2 rounded-3xl text-16-bold drop-shadow-button',
        edit: 'h-14 w-[168px] gap-2 rounded-3xl text-16-bold drop-shadow-button',
        plus: 'h-14 w-14 rounded-3xl drop-shadow-icon',
      },
      color: {
        slate: 'bg-slate-200 text-slate-900',
        violet: 'bg-violet-600 text-white',
        rose: 'bg-rose-500 text-white',
        lime: 'bg-lime-300 text-slate-900',
      },
    },
    defaultVariants: {
      variant: 'add',
      color: 'slate',
    },
  }
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  iconSrc?: string;
  iconAlt?: string;
}

const VARIANT_ICONS: Record<string, string> = {
  add: '/images/plusSm.svg',
  delete: '/images/X.svg',
  edit: '/images/check.svg',
  plus: '/images/plusSm.svg',
};

const VARIANT_LABELS: Record<string, string> = {
  add: '추가하기',
  delete: '삭제하기',
  edit: '수정 완료',
  plus: '',
};

const Button = ({
  children,
  className,
  variant = 'add',
  color,
  iconSrc,
  iconAlt = 'icon',
  ...props
}: ButtonProps) => {
  // Determine default color based on variant if not explicitly provided
  const defaultColor = variant === 'delete' ? 'rose' : 'slate';
  const finalColor = color || defaultColor;

  const currentIconSrc = iconSrc || (variant ? VARIANT_ICONS[variant] : undefined);

  // Invert icon if it's the plus icon (white by default) and background is light
  const isPlusIcon = variant === 'add' || variant === 'plus';
  const isLightBg = finalColor === 'slate' || finalColor === 'lime';
  const shouldInvertIcon = isPlusIcon && isLightBg;

  return (
    <button className={cn(buttonVariants({ variant, color: finalColor, className }))} {...props}>
      {currentIconSrc && (
        <div className="flex shrink-0 items-center justify-center">
          <Image
            src={currentIconSrc}
            alt={iconAlt}
            width={16}
            height={16}
            className={cn(shouldInvertIcon && 'invert')}
          />
        </div>
      )}

      {/* Show label if not icon-only variant (plus) */}
      {variant !== 'plus' && (
        <span className="leading-none whitespace-nowrap">
          {children || (variant ? VARIANT_LABELS[variant] : '')}
        </span>
      )}
    </button>
  );
};

export default Button;
