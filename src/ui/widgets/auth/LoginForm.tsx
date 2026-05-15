"use client";

import { Suspense, useState } from "react";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Separator } from "@/ui/separator";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import GithubOAuthButton from "../../component/GithubOAuthButton";
import GoogleOAuthButton from "../../component/GoogleOAuthButton";
import Link from "next/link";
import useLogin from "@/hooks/form/useLogin";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { submit, register, errors } = useLogin();
  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="pb-4 text-center">
        <Button
          size={"icon-lg"}
          variant={"secondary"}
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>

        <CardTitle className="text-2xl font-bold tracking-tight text-balance">
          Welcome back
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <GoogleOAuthButton />
          <Suspense fallback={<div>Loading...</div>}>
            <GithubOAuthButton />
          </Suspense>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            or
          </span>
          <Separator className="flex-1" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="pr-10"
                {...register("password")}
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-2 h-11 w-full text-sm font-semibold"
          >
            Login
          </Button>
          {errors.root && (
            <p className="text-xs text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Don`t have an account?{" "}
          <Link
            href="/auth/singup"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
