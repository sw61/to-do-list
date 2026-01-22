import { EditParams, ItemDetailPromise, ItemPromise } from './types';

const API_URL = 'https://assignment-todolist-api.vercel.app/api/sw61';

/** Item 목록 조회 */
export const getItems = async (): Promise<ItemPromise[]> => {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) throw new Error('목록 로드 실패');
  return response.json();
};

/** Item 상세 조회 */
export const getItemDetail = async (id: number): Promise<ItemDetailPromise> => {
  const response = await fetch(`${API_URL}/items/${id}`);
  if (!response.ok) throw new Error(`상세 조회 실패 (ID: ${id})`);
  return response.json();
};

/** Item 생성 */
export const postItem = async ({ name }: { name: string }) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('아이템 생성 실패');
  return response.json();
};

/** Item 수정 */
export const editItem = async ({ id, editParams }: { id: number; editParams: EditParams }) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editParams),
  });
  if (!response.ok) throw new Error('아이템 수정 실패');
  return response.json();
};

/** Item 삭제 */
export const deleteItem = async (id: number) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('아이템 삭제 실패');
  return response.json();
};

/** 이미지 업로드 */
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('이미지 업로드 실패');
  return response.json();
};
