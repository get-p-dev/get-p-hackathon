import React, { ReactNode } from "react";

export function BodyLayout({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-3xl">{children}</main>;
}
