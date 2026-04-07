"use client";
import { Input } from "@/ui/input";
import React, { ChangeEvent, useRef } from "react";

interface Props {
  debounceTimer?: number;
  debounceCallback: (
    ev: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => Promise<void> | void;
}

function InputWithDebounce({
  className,
  onChange,
  debounceTimer = 600,
  debounceCallback,
  ...props
}: React.ComponentProps<"input"> & Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputDebounce = (
    ev: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      debounceCallback(ev);
    }, debounceTimer);

    if (onChange) onChange(ev);
  };

  return (
    <Input
      {...props}
      className={className}
      onChange={(ev) => {
        handleInputDebounce(ev);
      }}
    ></Input>
  );
}

export default InputWithDebounce;
