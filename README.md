# To-Do List Application

## 📝 프로젝트 소개

Next.js, Typescript, Tailwind CSS를 사용하여 개발한 To-Do List 입니다.

## ✨ 주요 기능

### 1. 할 일 목록 대시보드 (`/`)

- **상태별 조회**: 'To Do'(진행 중)와 'Done'(완료) 상태로 나누어 할 일을 명확하게 구분합니다.
- **간편한 추가**: 상단의 입력창을 통해 Enter 키 또는 추가 버튼으로 빠르게 할 일을 등록합니다. (중복 제출 방지 적용)
- **상태 토글**: 체크박스를 클릭하여 할 일의 완료 여부를 즉시 변경할 수 있습니다.
- **반응형 레이아웃**: 데스크탑(Grid Layout)과 모바일 환경 모두에 최적화된 화면을 제공합니다.

### 2. 할 일 상세 페이지 (`/items/{itemId}`)

- **정보 수정**: 할 일의 제목, 메모, 완료 상태를 자유롭게 수정할 수 있습니다.
- **이미지 업로드**:
  - 각 할 일에 이미지를 1개 첨부할 수 있습니다.
  - **제약 조건**: 파일명은 영문/숫자만 허용되며, 크기는 5MB 이하로 제한됩니다.
- **삭제 기능**: 더 이상 필요 없는 할 일은 영구적으로 삭제할 수 있습니다.

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (PostCSS)
- **State Management**: TanStack Query (React Query) v5
- **Linting & Formatting**: ESLint, Prettier

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.17.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **프로젝트 클론**

   ```bash
   git clone <repository-url>
   cd to-do-list
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

4. **실행 확인**
   브라우저 주소창에 `http://localhost:3000`을 입력하여 접속합니다.

## 📂 폴더 구조

```bash
/
├── app/                  # Next.js App Router 페이지
│   ├── page.tsx          # 메인 페이지 (목록)
│   ├── [id]/page.tsx     # 상세 페이지
│   └── globals.css       # 전역 스타일 및 Tailwind 설정
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── button/           # 버튼 컴포넌트
│   ├── check-list/       # 체크리스트 아이템
│   ├── detail/           # 상세 페이지 전용 컴포넌트 (Form, Memo, ImageUploader)
│   ├── header/           # 헤더바
│   ├── home/             # 메인 페이지 전용 컴포넌트 (ListSection, AddTaskBar)
│   └── search-input/     # 검색/입력 인풋
├── hooks/                # 커스텀 훅
│   ├── useItems.ts       # React Query 데이터 페칭/뮤테이션
│   ├── useTodoList.ts    # 메인 페이지 로직 핸들러
│   └── useImageUpload.ts # 이미지 업로드 로직 핸들러
├── api/                  # API 통신 모듈
│   ├── service.ts        # API 호출 함수
│   └── types.ts          # 타입 정의
└── public/               # 정적 자원 (이미지, 폰트)
```

## 🎨 디자인 시스템

- **Font**: NanumSquare (L, R, B, EB)
- **Color Palette**:
  - **Slate**: 기본 텍스트 및 배경 (Slate-50 ~ Slate-900)
  - **Violet**: 메인 포인트 컬러 (Violet-600)
  - **Rose**: 삭제 등 경고 액션 (Rose-500)
  - **Lime**: 수정 완료 등 긍정 액션 (Lime-300)
