import React from 'react';
import SearchInput from '@/components/search-input/Search';
import Button from '@/components/button/Button';

interface AddTaskBarProps {
  newTaskName: string;
  onNameChange: (value: string) => void;
  onAdd: () => void;
  hasItems: boolean;
  isAdding: boolean;
}

/** 할 일 추가 바 컴포넌트
 * @param newTaskName - 새 할 일 이름
 * @param onNameChange - 이름 변경 핸들러
 * @param onAdd - 추가 핸들러
 * @param hasItems - 기존 항목 존재 여부
 * @param isAdding - 추가 중 상태 여부
 */
export default function AddTaskBar({
  newTaskName,
  onNameChange,
  onAdd,
  hasItems,
  isAdding,
}: AddTaskBarProps) {
  return (
    <div className="flex w-full items-center gap-4 pb-6 md:pb-[40px] lg:pb-[40px]">
      <SearchInput
        className="flex-1"
        value={newTaskName}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isAdding && !e.nativeEvent.isComposing) {
            onAdd();
          }
        }}
        disabled={isAdding}
      />
      <div className="md:hidden" onClick={isAdding ? undefined : onAdd}>
        <Button variant="plus" color={hasItems ? 'slate' : 'violet'} disabled={isAdding} />
      </div>
      <div className="hidden md:block" onClick={isAdding ? undefined : onAdd}>
        <Button variant="add" color={hasItems ? 'slate' : 'violet'} disabled={isAdding} />
      </div>
    </div>
  );
}
