import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItems, getItemDetail, editItem, deleteItem, postItem } from '../api/service';

// 1. 목록 조회 훅
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });
};

// 2. 상세 조회 훅
export const useItemDetail = (id: number) => {
  return useQuery({
    queryKey: ['itemsDetail', id],
    queryFn: () => getItemDetail(id),
    enabled: !!id, // ID가 있을 때만 실행
  });
};

// 3. 수정/생성/삭제 Mutation 훅들
export const useItemMutations = () => {
  const queryClient = useQueryClient();

  // 생성
  const addMutation = useMutation({
    mutationFn: postItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['itemsDetail'] });
    },
  });

  // 삭제
  const removeMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  });

  return { addMutation, updateMutation, removeMutation };
};
