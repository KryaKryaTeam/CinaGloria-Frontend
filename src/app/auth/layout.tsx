"use client";

import WaveBackground from "@/ui/backgrounds/WaveBackground";
import Script from "next/script";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <WaveBackground />
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </>
  );
}
