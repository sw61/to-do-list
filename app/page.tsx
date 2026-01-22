'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';
import AddTaskBar from '@/components/home/AddTaskBar';
import TodoListSection from '@/components/home/TodoListSection';
import { useTodoList } from '@/hooks/useTodoList';

/**
 * 메인 페이지 컴포넌트 (할 일 목록)
 * - 할 일 목록을 조회하고, 진행 중인 항목과 완료된 항목을 분리하여 표시합니다.
 * - 새로운 할 일을 추가하는 기능을 제공합니다.
 */
export default function Home() {
  const router = useRouter();
  const {
    items,
    todoTasks,
    doneTasks,
    newTaskName,
    setNewTaskName,
    handleAdd,
    handleToggle,
    isAdding,
  } = useTodoList();

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <div className="w-full border-b border-slate-200 bg-white">
        <Header />
      </div>

      <main className="px-4 pt-4 md:px-6 md:pt-6 lg:mx-auto lg:max-w-[1200px] lg:px-6">
        {/* 상단 입력 및 추가 섹션 */}
        <AddTaskBar
          newTaskName={newTaskName}
          onNameChange={setNewTaskName}
          onAdd={handleAdd}
          hasItems={items.length > 0}
          isAdding={isAdding}
        />

        {/* 리스트 섹션 */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
          {/* TO DO 섹션 */}
          <TodoListSection
            variant="todo"
            tasks={todoTasks}
            onToggle={handleToggle}
            onItemClick={(id) => router.push(`/${id}`)}
          />

          {/* DONE 섹션 */}
          <TodoListSection
            variant="done"
            tasks={doneTasks}
            onToggle={handleToggle}
            onItemClick={(id) => router.push(`/${id}`)}
          />
        </div>
      </main>
    </div>
  );
}
