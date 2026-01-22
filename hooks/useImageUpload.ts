import { uploadImage } from '@/api/service';

interface UseImageUploadOptions {
  onSuccess: (url: string) => void;
  onError?: (error: unknown) => void;
}

/** 이미지 업로드 훅
 * @param onSuccess - 업로드 성공 콜백
 * @param onError - 업로드 실패 콜백
 */
export const useImageUpload = ({ onSuccess, onError }: UseImageUploadOptions) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 이름 유효성 검사 (영문, 숫자, ., -, _ 만 허용)
    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert('파일 이름은 영어로만 이루어져야 합니다.');
      return;
    }

    // 파일 크기 검사 (5MB 이하)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      const { url } = await uploadImage(file);
      onSuccess(url);
    } catch (err) {
      console.error('Image upload failed', err);
      alert('이미지 업로드에 실패했습니다.');
      if (onError) onError(err);
    }
  };

  return { handleImageUpload };
};
