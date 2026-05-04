"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";

export default function ModalGoToAuth() {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.push("?")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-2">
            <LockKeyhole className="w-5 h-5 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl">Access Restricted</DialogTitle>
          <DialogDescription>
            You need to be signed in to view this page. Log in or create an
            account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Log In</Button>
          </Link>
          <span className="text-muted-foreground text-xs shrink-0">or</span>
          <Link href="/auth/singup" className="w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
