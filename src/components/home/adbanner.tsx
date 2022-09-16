import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

export type bannerType = {
  id: string;
  src: string;
  url: string;
  bgcolor: string;
};

export interface bannerProps {
  props: bannerType;
}

const banners_dummy = [
  {
    id: "cl6whzjll00013b6kz3ac76oo",
    src: "/banner1.jpeg",
    bgcolor: "bg-gradient-to-br from-pink-500 to-fuchsia-500",
    url: "/",
  },
  {
    id: "cl6whzjll00023b6k01fx9qmi",
    src: "/banner2.jpeg",
    bgcolor: "bg-gradient-to-br from-red-500 to-rose-500",
    url: "https://youtube.com",
  },
  {
    id: "cl6whzjll00033b6k267gddf2",
    src: "/banner3.jpeg",
    bgcolor: "bg-gradient-to-br from-green-500 to-emerald-500",
    url: "https://naver.com",
  },
];

const useBanner = () => {
  // fetch from server
  return banners_dummy;
};

const CardLink: React.FC<bannerProps & { size: boolean }> = ({
  props,
  size,
}) => {
  return (
    <>
      <Link href={props.url}>
        <a
          className={`relative aspect-[16/9] w-full shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-transform duration-500 ease-out ${
            size ? "shadow-xl" : "shadow-none"
          }`}
          style={{ scale: size ? "100%" : "90%" }}
        >
          <div className={`${props.bgcolor} absolute inset-0 h-full`}></div>
          {props.src && (
            <Image src={props.src} alt={`image-${props.id}`} layout="fill" />
          )}
        </a>
      </Link>
    </>
  );
};

const CardLinkMemo = memo(CardLink);

const ArrowButton = ({
  dir,
  handleClick,
}: {
  dir: string;
  handleClick: any;
}) => {
  return (
    <button
      className={`absolute top-[50%] z-10 -translate-y-1/2 rounded-full bg-white/50 p-4 transition-colors ease-in-out hover:bg-white/80`}
      style={{ [dir]: "1rem" }}
    >
      {dir === "left" ? (
        <ChevronLeftIcon
          className="h-6 w-6 text-base-100"
          onClick={() => handleClick(dir)}
        />
      ) : (
        <ChevronRightIcon
          className="h-6 w-6 text-base-100"
          onClick={() => handleClick(dir)}
        />
      )}
    </button>
  );
};

const AdBanner = () => {
  const [slide, setSlide] = useState(1);
  const banners = useBanner();

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     if (slide >= banners.length - 1) {
  //       setSlide(0);
  //     } else {
  //       setSlide((v) => v + 1);
  //     }
  //   }, 3000);
  //   return () => clearInterval(id);
  // }, [slide, banners.length]);

  const handleClick = (dir: string) => {
    // console.log(dir, v);
    let direction = 1;
    if (dir === "left") direction = -1;

    const next = slide + direction;

    if (next < 0) setSlide(banners.length - 1);
    else setSlide(next % banners.length);
  };

  return (
    <section className="relative mx-auto w-full max-w-2xl scroll-mx-6 overflow-visible scroll-smooth py-4">
      <p className="md:text-md pointer-events-none absolute right-5 top-7 z-10 rounded-full bg-white/20 px-3 py-1 text-xs text-gray-100/90">{`${
        slide + 1
      }/${banners.length}`}</p>

      <ArrowButton dir="right" handleClick={handleClick} />
      <ArrowButton dir="left" handleClick={handleClick} />

      <div
        className={`z-0 flex flex-row gap-4 px-2 transition-all duration-300 ease-in-out`}
        style={{ transform: `translateX(-${slide}00%)` }}
      >
        {banners.map((banner, index) => {
          const size = index === slide;
          return <CardLinkMemo props={banner} size={size} key={banner.id} />;
        })}
      </div>
    </section>
  );
};

export default AdBanner;