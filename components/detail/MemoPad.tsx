import React from 'react';

interface MemoPadProps {
  value: string;
  onChange: (value: string) => void;
}

/** 메모 패드 컴포넌트
 * @param value - 메모 내용
 * @param onChange - 메모 내용 변경 핸들러
 */
export default function MemoPad({ value, onChange }: MemoPadProps) {
  return (
    <section className="relative flex-1">
      <div className="h-[311px] rounded-[24px] bg-[url('/images/memo.png')] px-4 pt-6">
        <p className="text-16-extrabold mb-4 text-center text-amber-800">Memo</p>
        <div className="h-[229px]">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-16-regular inline-block h-[229px] w-full resize-none bg-transparent text-center align-middle text-wrap overflow-ellipsis text-slate-800 outline-none placeholder:text-slate-400 [&::-webkit-scrollbar]:[width:4px] [&::-webkit-scrollbar-thumb]:[border-radius:3px] [&::-webkit-scrollbar-thumb]:bg-amber-200"
            placeholder="내용을 입력해주세요"
          />
        </div>
      </div>
    </section>
  );
}
