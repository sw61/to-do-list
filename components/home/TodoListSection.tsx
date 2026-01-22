import React from 'react';
import Image from 'next/image';
import CheckList from '@/components/check-list/CheckList';

interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface TodoListSectionProps {
  variant: 'todo' | 'done';
  tasks: Task[];
  onToggle: (id: number, currentStatus: boolean) => void;
  onItemClick: (id: number) => void;
}

/** 할 일 리스트 섹션 컴포넌트
 * @param variant - 섹션 종류 ('todo' | 'done')
 * @param tasks - 할 일 목록
 * @param onToggle - 할 일 완료 상태 토글 핸들러
 * @param onItemClick - 할 일 아이템 클릭 핸들러
 */
export default function TodoListSection({
  variant,
  tasks,
  onToggle,
  onItemClick,
}: TodoListSectionProps) {
  const isTodo = variant === 'todo';
  const titleImage = isTodo ? '/images/todo.png' : '/images/done.png';
  const altText = isTodo ? 'TO DO' : 'DONE';

  return (
    <section className="flex flex-col gap-4">
      <div className="relative h-[36px] w-[101px]">
        <Image src={titleImage} alt={altText} fill className="object-contain" />
      </div>
      {/* 체크 리스트 아이템 목록 */}
      {tasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <CheckList
              key={task.id}
              isCompleted={!isTodo}
              onToggle={() => onToggle(task.id, task.isCompleted)}
              onItemClick={() => onItemClick(task.id)}
            >
              {task.name}
            </CheckList>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-0 text-center lg:py-16">
          {/* Item이 없을 시 표시되는 이미지 */}
          <div className={`hidden md:block ${isTodo ? '' : 'mb-[20px]'}`}>
            <Image
              src={isTodo ? '/images/emptyWriteLg.png' : '/images/emptyLg.png'}
              alt="No tasks"
              width={240}
              height={240}
            />
          </div>
          <div className="md:hidden">
            <Image
              src={isTodo ? '/images/emptyWriteSm.png' : '/images/emptySm.png'}
              alt="No tasks"
              width={120}
              height={120}
            />
          </div>
          {/* Item 없을 시 표시되는 텍스트 */}
          <p className="text-16-bold mt-6 text-slate-400 sm:mt-4">
            {isTodo ? (
              <>
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </>
            ) : (
              <>
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
