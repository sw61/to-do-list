/** 목록 조회 Promise */
export interface ItemPromise {
  id: number;
  name: string;
  isCompleted: boolean;
}

/** 상세 조회 Promise */
export interface ItemDetailPromise {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

/** 수정 Params */
export interface EditParams {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
