'use client'
import AuthCheck from "@/core/client-check/AuthCheck";
import container from "@/core/Container";
import { TYPES } from "@/core/Container.types";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
    const router = useRouter();
    const check = container.get<AuthCheck>(TYPES.AuthCheck);
    check.setRouter(router)

    useEffect(() => {
        check.check();
    })
    return (
        <div>
            {children}
        </div>
    )
}