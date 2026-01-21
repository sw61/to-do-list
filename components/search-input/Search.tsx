import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export default function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "w-full border-2 border-slate-900 bg-slate-100 px-6 py-4 text-16-regular outline-none transition-all max-w-[1000px]",
          "rounded-3xl drop-shadow-button placeholder:text-slate-500 ",
          className
        )}
        {...props}
        placeholder="할 일을 입력해주세요"
      />
    </div>
  );
}