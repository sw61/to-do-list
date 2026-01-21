import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex h-[60px] w-full items-center border-b border-slate-200 bg-white pl-6 lg:pl-[360px]">
      <Link href="/">
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
      </Link>
    </header>
  );
}