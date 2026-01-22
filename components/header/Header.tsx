import Link from 'next/link';
import Image from 'next/image';

/** 헤더 컴포넌트 */
export default function Header() {
  return (
    <header className="flex h-[60px] w-full items-center bg-white pl-6 lg:mx-auto lg:max-w-[1200px]">
      <div>
        {/* '/' 경로 이동 및 새로고침 */}
        <a href="/">
          {/* 모바일용 작은 로고 */}
          <div className="md:hidden">
            <Image
              src="/images/doItSm.png"
              alt="do it mobile logo"
              width={71}
              height={40}
              priority
            />
          </div>

          {/* 데스크탑용 큰 로고 */}
          <div className="hidden md:block">
            <Image
              src="/images/doItLg.png"
              alt="do it desktop logo"
              width={151}
              height={40}
              priority
            />
          </div>
        </a>
      </div>
    </header>
  );
}
