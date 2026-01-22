import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/** 검색 입력 컴포넌트
 * @param className - 추가 클래스 이름
 * @param props - 기타 input 속성
 */
export default function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          'text-16-regular w-full max-w-[1000px] border-2 border-slate-900 bg-slate-100 px-6 py-4 transition-all outline-none',
          'drop-shadow-button rounded-3xl placeholder:text-slate-500',
          className
        )}
        {...props}
        placeholder="할 일을 입력해주세요"
      />
    </div>
  );
}
