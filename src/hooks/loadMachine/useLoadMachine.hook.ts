import container from "@/core/Container";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { useMemo } from "react";

export function useLoadMachine() {
  const loader = useMemo(() => container.get(LoadState), []);

  return loader;
}
