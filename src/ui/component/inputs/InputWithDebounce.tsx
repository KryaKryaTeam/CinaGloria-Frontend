"use client";

import { cn } from "@/infrastructure/utils";
import { useState, useEffect, useRef, InputHTMLAttributes } from "react";


interface InputWithDebounceProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
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
  const [inputValue, setInputValue] = useState<string>((propValue as string) || "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with external value changes (e.g., clearing from parent)
  useEffect(() => {
    if (propValue !== undefined && propValue !== inputValue) {
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
        "flex h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition-all",
        "hover:bg-white/[0.05] hover:border-white/15",
        "focus:border-white/25 focus:ring-2 focus:ring-white/10",
        className
      )}
    />
  );
}