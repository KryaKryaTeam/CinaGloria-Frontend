"use client";

import { cn } from "@/infrastructure/utils";
import { useState, useEffect, useRef, InputHTMLAttributes } from "react";

interface InputWithDebounceProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  debounceCallback: (value: string) => void;
  debounceMs?: number;
}

export default function InputWithDebounce({
  debounceCallback,
  debounceMs = 300,
  value: propValue,
  className,
  ...props
}: InputWithDebounceProps) {
  const [inputValue, setInputValue] = useState<string>(
    (propValue as string) || "",
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with external value changes (e.g., clearing from parent)
  useEffect(() => {
    if (propValue !== undefined && propValue !== inputValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue(propValue as string);
    }
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      debounceCallback(newValue);
    }, debounceMs);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      {...props}
      type="text"
      value={inputValue}
      onChange={handleChange}
      className={cn(
        "flex h-10 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all",
        className,
      )}
    />
  );
}
