import StarSVG from "./star-svg";

export interface LikeButtonProps {
  like: boolean;
  hasShadow?: boolean;
  onClick: () => any;
  [key: string]: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  like,
  hasShadow = false,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`
        "relative ease-in-out" flex aspect-square w-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-colors duration-300
        ${like ? "bg-blue-600" : "bg-gray-200"}
        ${
          hasShadow ? "shadow-gray-900 drop-shadow-2xl sm:drop-shadow-none" : ""
        }
      `}
      onClick={onClick}
      {...rest}
    >
      <StarSVG fill={like} duration={"short"} />
    </div>
  );
};

export default LikeButton;
