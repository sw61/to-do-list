import { useState } from 'react';
import { useItems, useItemMutations } from '@/hooks/useItems';

/** 할 일 목록 훅 */
export const useTodoList = () => {
  const { data: items = [] } = useItems();
  const { addMutation, updateMutation } = useItemMutations();
  const [newTaskName, setNewTaskName] = useState('');

  const todoTasks = items.filter((t) => !t.isCompleted);
  const doneTasks = items.filter((t) => t.isCompleted);

  // 할 일 추가 핸들러
  const handleAdd = () => {
    if (!newTaskName.trim() || addMutation.isPending) return;
    addMutation.mutate(
      { name: newTaskName },
      {
        onSuccess: () => setNewTaskName(''),
      }
    );
  };

  // 할 일 완료 상태 토글 핸들러
  const handleToggle = (id: number, currentStatus: boolean) => {
    updateMutation.mutate({ id, editParams: { isCompleted: !currentStatus } });
  };

  return {
    items,
    todoTasks,
    doneTasks,
    newTaskName,
    setNewTaskName,
    handleAdd,
    handleToggle,
    isAdding: addMutation.isPending,
  };
};
