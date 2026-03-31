"use client";
import container from "@/core/Container";
import RequestMe from "@/core/requests/network/Me.request";
import { UserState } from "@/state/UserState";
import { Button } from "@/ui/button";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect } from "react";

export default observer(function ProfileHeaderButtons() {
  const userState = container.get(UserState);

  useEffect(() => {
    const request = container.get(RequestMe);
    request.execute();
  }, []);
  return (
    <>
      {userState.isAuthorized ? (
        <Link href={"/app/profile"}>
          <Button>To profile</Button>
        </Link> // need to be replaced
      ) : (
        <div className="flex flex-row gap-2">
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/singup">
            <Button variant={"secondary"}>Registration</Button>
          </Link>
        </div>
      )}
    </>
  );
});
