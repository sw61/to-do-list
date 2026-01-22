import React, { useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** 이미지 업로더 컴포넌트
 * @param imageUrl - 현재 이미지 URL
 * @param onImageChange - 이미지 변경 핸들러
 */
export default function ImageUploader({ imageUrl, onImageChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="group relative">
      <div
        className={`relative flex h-[311px] items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 lg:w-[384px] ${imageUrl && 'border-none'}`}
      >
        {/* 이미지가 있을 경우 표시, 없을 경우 플레이스홀더 */}
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt="Task Image" fill className="rounded-[24px] object-cover" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="relative size-16">
              <Image src="/images/img.svg" alt="placeholder" fill />
            </div>
          </div>
        )}

        {/* 이미지 업로드 버튼 */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`absolute right-4 bottom-4 flex size-16 items-center justify-center rounded-full active:translate-y-[1px] ${
            imageUrl ? 'border-2 border-slate-900 bg-slate-900/50' : 'bg-slate-200'
          }`}
        >
          <Image
            src={imageUrl ? '/images/edit.svg' : '/images/plusSm.svg'}
            alt={imageUrl ? 'edit' : 'add'}
            width={24}
            height={24}
          />
        </button>
      </div>
    </section>
  );
}
