"use client";
import container, { TYPES } from "@/core/Container";
import { UserState } from "@/state/UserState";

export default function PageProfile() {
  const user = container.get<UserState>(TYPES.UserState);
  return <div>dsasd</div>;
}
