"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import container from "@/core/Container";
import { usePathname, useRouter } from "next/navigation";
import { RequestLoginWithGoogle } from "@/core/requests/network/LoginWithGoogle.request";

export default function GoogleOAuthButton() {
  const [Error, setError] = useState<string | null>(null);
  const n = useRouter();
  const p = usePathname();

  const initializeGoogle = () => {
    if (!window.google) return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    window.google.accounts.id.initialize({
      client_id: clientId!,
      use_fedcm_for_prompt: true,
      callback: async (res: { credential: string }) => {
        try {
          const request = container.get(RequestLoginWithGoogle);
          const existsBefore = await request.execute({
            code: res.credential,
          });

          n.push(existsBefore ? "/app/profile" : "/auth/info");
        } catch (err) {
          setError(`Login failed: ${(err as Error).message}`);
        }
      },
    });

    const parent = document.getElementById("googleBtn");
    if (parent) {
      window.google.accounts.id.renderButton(parent, {
        theme: "outline",
        size: "large",
        type: "standard",
        text: "continue_with",
        width: parent.clientWidth,
      });
    }

    window.google.accounts.id.prompt();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      initializeGoogle();
    }
  }, [p]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        onLoad={async (e) => {
          initializeGoogle();
        }}
      ></Script>

      <div id="googleBtn" className="w-full h-11 overflow-y-clip"></div>
      {Error && <p className="text-xs text-destructive">{Error}</p>}
    </>
  );
}
