import { Github } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import container, { TYPES } from "@/core/Container";
import { UserState } from "@/state/UserState";

export default function GithubOAuthButton() {
  const n = useRouter();
  const [Error, setError] = useState();
  const githubWin = useRef<Window>(null);
  const handleFlow = () => {
    if (typeof window === "undefined") return;

    githubWin.current = window.open(
      `/auth/login/github`,
      "github",
      `popup=true,width=400,height=600,top=${window.innerHeight / 2 - 300},left=${window.innerWidth / 2 - 200},menubar=false`,
    ) as Window;
  };
  useEffect(() => {
    const handleAuthMessage = (ev: MessageEvent) => {
      if (!githubWin.current) return;
      if (ev.origin !== window.location.origin) return;

      const { EVENT, data } = ev.data;

      if (EVENT) {
        switch (EVENT) {
          case "SUCCESS": {
            const state = container.get<UserState>(TYPES.UserState);
            state.setAuthToken(data.accessToken);

            if (data?.userExistsBefore) {
              n.push("/app/profile");
            } else {
              n.push("/auth/info");
            }
            break;
          }
          case "ERROR": {
            setError(data || "Unknown error");
            break;
          }
        }

        if (githubWin.current && !githubWin.current.closed) {
          githubWin.current.close();
        }
      }
    };

    window.addEventListener("message", handleAuthMessage);

    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, [githubWin, n]);
  return (
    <>
      <Button className="h-10" onClick={handleFlow}>
        <Github className="h-5 w-5 mr-2" />
        Continue with GitHub
      </Button>
      {Error && <p className="text-xs text-destructive">{Error}</p>}
    </>
  );
}
