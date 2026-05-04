"use client";

import { useState } from "react";
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
import useSignup from "@/hooks/form/useSingup";
import { Checkbox } from "@/ui/checkbox";
import { useRouter } from "next/navigation";

export function SingupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { submit, register, errors, setValue } = useSignup();
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
          Create your account
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your details below to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <GoogleOAuthButton />
          <GithubOAuthButton />
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
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
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
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <div className="relative">
              <Input
                id="repeatPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                {...register("repeatPassword")}
                autoComplete="new-password"
                className="pr-10"
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
          </div>
          {errors.repeatPassword && (
            <p className="text-xs text-destructive">
              {errors.repeatPassword.message}
            </p>
          )}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              onCheckedChange={(checked) =>
                setValue("termsAndPolicyChecked", checked === true)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="underline font-semibold hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and have read the{" "}
              <Link
                href="/policy"
                className="underline font-semibold  hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.termsAndPolicyChecked && (
            <p className="text-xs text-destructive">
              {errors.termsAndPolicyChecked.message}
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 h-11 w-full text-sm font-semibold"
          >
            Create Account
          </Button>
          {errors.root && (
            <p className="text-xs text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
