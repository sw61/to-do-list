'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/header/Header';
import DetailForm from '@/components/detail/DetailForm';
import { useItemDetail } from '@/hooks/useItems';

/**
 * 할 일 상세 페이지 컴포넌트
 */
export default function ItemDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: item, isLoading, error } = useItemDetail(id);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error || !item)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error loading item</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full border-b border-slate-200 bg-white">
        <Header />
      </div>

      <DetailForm data={item} />
    </div>
  );
}
