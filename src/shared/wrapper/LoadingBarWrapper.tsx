"use client";
// import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ProgressProvider } from "@bprogress/next/app";

export default function LoadingBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      color={"oklch(54.6% 0.245 262.881)"}
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
