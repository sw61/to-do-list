import React from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'items-center justify-center flex h-14 text-16-bold rounded-3xl border-2 border-slate-900 shrink-0 transition-all duration-100 active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        add: 'px-12 gap-2 bg-slate-200 drop-shadow-button',
        delete: 'px-12 gap-2 bg-rose-500 text-white drop-shadow-button',
        editSlate: 'px-12 gap-2 bg-slate-200 drop-shadow-button',
        editLime: 'px-12 gap-2 bg-lime-300 drop-shadow-button',
        violetAdd: 'px-12 gap-2 bg-violet-600 text-white drop-shadow-button',
        slatePlus: 'w-14 h-14 bg-slate-200 drop-shadow-icon',
        violetPlus: 'w-14 h-14 bg-violet-600 drop-shadow-icon',
      },
    },
    defaultVariants: {
      variant: 'add',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  iconSrc?: string;
  iconAlt?: string;
}

// 1. 아이콘 매핑
const VARIANT_ICONS: Record<string, string> = {
  add: '/images/plusSm.svg',
  delete: '/images/X.svg',
  editSlate: '/images/check.svg',
  editLime: '/images/check.svg',
  violetAdd: '/images/plusSm.svg',
  slatePlus: '/images/plusSm.svg',
  violetPlus: '/images/plusSm.svg',
};

// 2. 기본 텍스트 매핑
const VARIANT_LABELS: Record<string, string> = {
  add: '추가하기',
  delete: '삭제하기',
  editSlate: '수정 완료',
  editLime: '수정 완료',
  violetAdd: '추가하기',
};

const Button = ({
  children,
  className,
  variant,
  iconSrc,
  iconAlt = 'icon',
  ...props
}: ButtonProps) => {
  const currentVariant = variant || 'add';
  const currentIconSrc = iconSrc || VARIANT_ICONS[currentVariant];

  // slate 계열은 아이콘을 검정색으로 반전 (흰색 SVG -> 검정색)
  const shouldInvertIcon = currentVariant === 'add' || currentVariant === 'slatePlus';
  const isIconOnly = currentVariant === 'slatePlus' || currentVariant === 'violetPlus';

  return (
    <button
      className={cn(buttonVariants({ variant: currentVariant, className }))}
      {...props}
    >
      {currentIconSrc && (
        <div className="flex items-center justify-center shrink-0">
          <Image
            src={currentIconSrc}
            alt={iconAlt}
            width={16}
            height={16}
            className={cn(shouldInvertIcon && "invert")}
          />
        </div>
      )}

      {/* variant에 따른 기본 텍스트 출력 (children이 없을 때만 기본값 사용) */}
      {!isIconOnly && (
        <span className="leading-none whitespace-nowrap">
          {children || VARIANT_LABELS[currentVariant]}
        </span>
      )}
    </button>
  );
};

export default Button;