import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckList from '@/components/check-list/CheckList';
import Button from '@/components/button/Button';
import ImageUploader from '@/components/detail/ImageUploader';
import MemoPad from '@/components/detail/MemoPad';
import { useItemMutations } from '@/hooks/useItems';
import { useImageUpload } from '@/hooks/useImageUpload';
import { EditParams, ItemDetailPromise } from '@/api/types';

interface DetailFormProps {
  data: ItemDetailPromise;
}

/** 할 일 상세 폼 컴포넌트
 * @param data - 할 일 상세 데이터
 */
export default function DetailForm({ data }: DetailFormProps) {
  const router = useRouter();
  const { updateMutation, removeMutation } = useItemMutations();

  const [formData, setFormData] = useState<EditParams>({
    name: data.name,
    memo: data.memo || '',
    imageUrl: data.imageUrl || '',
    isCompleted: data.isCompleted,
  });

  const { handleImageUpload } = useImageUpload({
    onSuccess: (url) => setFormData((prev) => ({ ...prev, imageUrl: url })),
  });

  const handleSave = () => {
    updateMutation.mutate(
      {
        id: data.id,
        editParams: formData,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
      }
    );
  };

  const handleDelete = () => {
    removeMutation.mutate(data.id, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <main className="min-h-[calc(100vh-61px)] flex-1 bg-white px-4 pt-4 md:px-6 md:pt-6 lg:mx-auto lg:max-w-[1200px] lg:px-[102px]">
      {/* 상단 체크리스트 영역 */}
      <div className="mb-4">
        <CheckList
          isDetail
          isCompleted={formData.isCompleted}
          onToggle={(next) => setFormData((prev) => ({ ...prev, isCompleted: next }))}
          onUpdateText={(newName) => setFormData((prev) => ({ ...prev, name: newName }))}
        >
          {formData.name || ''}
        </CheckList>
      </div>

      {/* 이미지 및 메모 영역 */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* 이미지 섹션 */}
        <ImageUploader imageUrl={formData.imageUrl || ''} onImageChange={handleImageUpload} />

        {/* 메모 섹션 */}
        <MemoPad
          value={formData.memo || ''}
          onChange={(val) => setFormData((prev) => ({ ...prev, memo: val }))}
        />
      </div>
      {/* 3. 하단 버튼 영역 */}
      <div className="mt-6 flex items-center justify-center gap-3 lg:justify-end lg:gap-5">
        <Button
          variant="edit"
          color={formData.memo && formData.imageUrl ? 'lime' : 'slate'}
          onClick={handleSave}
        />
        <Button variant="delete" onClick={handleDelete} />
      </div>
    </main>
  );
}
