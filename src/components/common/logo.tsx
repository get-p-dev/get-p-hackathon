export default function Logo({ width = 110 }: { width?: number }) {
  return (
    <a className="btn btn-ghost text-xl normal-case">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="GET-P"
        className="scale-110"
        style={{ scale: `${width}%` }}
      />
    </a>
  );
}
