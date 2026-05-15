"use client";
import URLEnum from "@/core/requests/URLEnum";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function GitHubLoginHandler() {
  const n = useRouter();
  const p = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!window.opener) {
      window.location.assign("/auth/login");
      return;
    }

    async function call() {
      setLoading(true);
      n.push(
        `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      );
    }

    async function process_() {
      setLoading(true);
      if (p.get("error"))
        return window.opener.postMessage(
          { EVENT: "ERROR", data: "Login failed." },
          window.location.origin,
        );

      try {
        const csrf = await fetch(URLEnum.CSRF, { credentials: "include" });
        if (!csrf.ok)
          return window.opener.postMessage({
            EVENT: "ERROR",
            data: "CSRF failed!",
          });

        const token = ((await csrf.json()) as { csrf: string }).csrf;

        const url = new URL(URLEnum.LOGIN_GITHUB);
        url.searchParams.append("state", token);

        const login = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: p.get("code") }),
          credentials: "include",
        });

        if (!login.ok) {
          const errorData = await login.json();
          return window.opener.postMessage(
            { EVENT: "ERROR", data: `Login failed. ${errorData.message}` },
            window.location.origin,
          );
        }

        const data = await login.json();

        return window.opener.postMessage(
          {
            EVENT: "SUCCESS",
            data: {
              accessToken: data.accessToken,
              userExistsBefore: data.userExistsBefore,
            },
          },
          window.location.origin,
        );
      } catch (e) {
        console.error("Auth error:", e);
      }
    }

    if (p.get("code") || p.get("error")) {
      process_();
    } else {
      call();
    }
  }, [p, n, loading]);

  return (
    <div className="bg-background flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <Loader className="animate-spin" />
      <h2 className="text-xs font-light">Processing GitHub Login...</h2>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-background flex flex-col gap-2 justify-center items-center w-screen h-screen">
          <Loader className="animate-spin" />
          <h2 className="text-xs font-light">Loading...</h2>
        </div>
      }
    >
      <GitHubLoginHandler />
    </Suspense>
  );
}
