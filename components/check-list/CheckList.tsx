'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TodoItemProps {
  children: string;
  isCompleted?: boolean;
  isDetail?: boolean;
  onToggle?: (nextState: boolean) => void;
  onUpdateText?: (newText: string) => void;
  className?: string;
  onItemClick?: () => void;
}

/** 체크리스트
 * @param children - 할 일 텍스트
 * @param isCompleted - 완료 여부
 * @param isDetail - 상세 모드 여부
 * @param onToggle - 완료 상태 토글 콜백
 * @param onUpdateText - 텍스트 업데이트 콜백
 * @param className - 추가 클래스 이름
 * @param onItemClick - 아이템 클릭 콜백
 * 컴포넌트 */
export default function CheckList({
  children,
  isCompleted: initialCompleted = false,
  isDetail = false,
  onToggle,
  onUpdateText,
  className,
  onItemClick,
}: TodoItemProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [text, setText] = useState(children);
  const [inputWidth, setInputWidth] = useState(0);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 초기값 동기화
  useEffect(() => {
    setCompleted(initialCompleted);
    setText(children);
  }, [initialCompleted, children]);

  // input width 동적 조절
  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.getBoundingClientRect().width;
      setInputWidth(width > 0 ? width : 20);
    }
  }, [text, isDetail]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !completed;
    setCompleted(nextState);
    if (onToggle) onToggle(nextState);
  };

  const handleBlur = () => {
    if (onUpdateText && text !== children) {
      onUpdateText(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return (
    <div
      className={cn(
        'flex h-[50px] w-full shrink-0 cursor-pointer items-center rounded-3xl border-2 border-slate-900 px-3 transition-all duration-100 select-none',
        'active:translate-y-[2px]',
        completed ? 'bg-violet-100' : 'bg-white',
        isDetail ? 'h-[64px] justify-center gap-4' : 'justify-start gap-3',
        className
      )}
      onClick={onItemClick}
    >
      <div className={cn('flex items-center', isDetail ? 'gap-4' : 'gap-3')}>
        <div className="relative size-8 shrink-0" onClick={handleToggle}>
          <Image
            src={completed ? '/images/checkBox.svg' : '/images/checkBoxNone.svg'}
            alt="checkbox"
            fill
            className="object-contain"
          />
        </div>

        {isDetail ? (
          <div className="relative flex items-center">
            <span
              ref={spanRef}
              className="text-20-bold invisible absolute whitespace-pre"
              aria-hidden="true"
            >
              {text || ''}
            </span>

            <input
              ref={inputRef}
              type="text"
              value={text}
              style={{ width: `${inputWidth}px` }}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'bg-transparent transition-all duration-100 outline-none',
                'text-20-bold text-left text-slate-900 underline decoration-1'
              )}
            />
          </div>
        ) : (
          <span
            className={cn(
              'text-16-bold leading-none text-slate-900 transition-all duration-100',
              completed && 'line-through'
            )}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
