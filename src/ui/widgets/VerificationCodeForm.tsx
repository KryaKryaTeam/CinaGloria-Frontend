"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { ArrowLeft } from "lucide-react";
import { Input } from "../input";
import { Label } from "../label";
import useVerification from "@/hooks/form/useVerification";

function VerificationCodeForm() {
  const { errors, register, submit } = useVerification();
  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="text-center">
        <Link href={"/"} className="w-max">
          <Button
            size={"icon-lg"}
            variant={"secondary"}
            className="cursor-pointer"
          >
            <ArrowLeft />
          </Button>
        </Link>
        <CardTitle className="text-2xl font-bold tracking-tight text-balance">
          Check out your email
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          We sended you an email with verification code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="number"
              placeholder="6-digit verification code"
              {...register("code")}
            ></Input>
            {errors.code && (
              <p className="text-xs text-destructive">{errors.code.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-2 h-11 w-full text-sm font-semibold"
          >
            Verify
          </Button>
          {errors.root && (
            <p className="text-xs text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default VerificationCodeForm;
