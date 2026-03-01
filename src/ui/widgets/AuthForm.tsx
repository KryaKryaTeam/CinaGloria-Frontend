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
import { Eye, EyeOff } from "lucide-react";
import GithubOAuthButton from "../component/GithubOAuthButton";
import GoogleOAuthButton from "../component/GoogleOAuthButton";
import Link from "next/link";

interface AuthFormProps {
  authPageType: "login" | "signup";
}

export function AuthForm({ authPageType }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="pb-4 text-center">
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

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {authPageType === "signup" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                type="text"
                placeholder="Doe"
                // value={surname}
                // onChange={(e) => setSurname(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="pr-10"
                required
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
          {authPageType === "signup" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <div className="relative">
                <Input
                  id="repeatPassword"
                  placeholder="Repeat your password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  autoComplete="new-password"
                  className="pr-10"
                  required
                />
              </div>
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
          )}
          <Button
            type="submit"
            className="mt-2 h-11 w-full text-sm font-semibold"
          >
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={authPageType === "signup" ? "/auth/login" : "/auth/signup"}
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
          >
            {authPageType === "signup" ? "Log in" : "Sign up"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
