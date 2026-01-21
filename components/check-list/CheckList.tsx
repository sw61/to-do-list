'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TodoItemProps {
  children: React.ReactNode;
  isCompleted?: boolean;
  isDetail?: boolean; // 상세 페이지 모드
  onToggle?: (nextState: boolean) => void;
  className?: string;
}

export default function CheckList({
  children,
  isCompleted: initialCompleted = false,
  isDetail = false,
  onToggle,
  className,
}: TodoItemProps) {
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleToggle = () => {
    const nextState = !completed;
    setCompleted(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={cn(
        'flex w-full cursor-pointer items-center border-2 border-slate-900 px-3 h-[50px] transition-all duration-100 rounded-3xl shrink-0 select-none',
        'drop-shadow-icon active:translate-y-[2px] active:shadow-none',

        // 배경색: 완료 여부에 따라 변경
        completed ? 'bg-violet-100' : 'bg-white',

        // 정렬: 상세 모드일 때 중앙 정렬(justify-center)
        isDetail ? 'justify-center gap-4 h-[64px] text-20-bold' : 'justify-start gap-3',
        className
      )}
    >
      {/* 체크박스 아이콘 */}
      <div className="relative size-8 shrink-0">
        <Image
          src={completed ? '/images/checkBox.svg' : '/images/checkBoxNone.svg'}
          alt="checkbox"
          fill
          className="object-contain"
        />
      </div>

      {/* 텍스트 영역 */}
      <span
        className={cn(
          'text-16-bold text-slate-900 leading-none transition-all duration-100',
          // 상세 페이지 모드일 때 항상 밑줄(underline)
          isDetail && 'underline decoration-1',
          // 완료 상태일 때 가로선(line-through) 추가
          completed && 'line-through'
        )}
      >
        {children}
      </span>
    </div>
  );
}