import React from "react";

export interface SVGProps {
  fill?: boolean;
  size?: number;
  duration?: "long" | "short";
}

const StarSVG: React.FC<SVGProps> = ({
  size = "24",
  fill,
  duration = "long",
}) => {
  const color = fill ? "#ffc814" : "#fff";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <g id="ic_like_40_on_01" transform="translate(-32 -224)">
        <rect
          id="사각형_1877"
          data-name="사각형 1877"
          width={size}
          height={size}
          fill="none"
        />
        <path
          className={`
            transition-all ease-in-out
            ${duration === "long" ? "duration-500" : "duration-300"}
          `}
          id="패스_5668"
          data-name="패스 5668"
          d="M11.329,1.806a1.656,1.656,0,0,1,2.862,0l2.86,4.907a1.658,1.658,0,0,0,1.024.772l5.434,1.382a1.663,1.663,0,0,1,.88,2.657l-3.706,4.584a1.664,1.664,0,0,0-.365,1.169l.436,5.92a1.658,1.658,0,0,1-2.313,1.647l-5.02-2.185a1.654,1.654,0,0,0-1.32,0L7.08,24.843A1.658,1.658,0,0,1,4.767,23.2l.436-5.92a1.664,1.664,0,0,0-.365-1.169L1.132,11.524a1.663,1.663,0,0,1,.88-2.657L7.446,7.485A1.658,1.658,0,0,0,8.47,6.712Z"
          transform="translate(31.239 223.018)"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default StarSVG;
