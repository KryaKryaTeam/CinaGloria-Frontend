import React, { forwardRef, useRef, useState } from "react";
import { Input } from "../input";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/infrastructure/utils";
import { mergeRefs } from "@/infrastructure/mergeRefs";

const f = forwardRef<
  HTMLInputElement,
  UseFormRegisterReturn &
    React.ComponentProps<"input"> & { showSelected?: boolean }
>(({ className, onChange, showSelected = false, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [Selected, setSelected] = useState(false);
  const [DragEnter, setDragEnter] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragEnter(true);
  };
  const handleDragLeave = () => {
    setDragEnter(false);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev);

    if (ev.target.files?.item(0)) setSelected(true);
    else setSelected(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!inputRef.current) return;

    setDragEnter(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      // Синхронізуємо файли з прихованим інпутом
      inputRef.current.files = files;

      // Створюємо подію, яку RHF зможе розпарсити
      const syntheticEvent = {
        target: inputRef.current,
        type: "change",
      } as React.ChangeEvent<HTMLInputElement>;

      setSelected(true);
      onChange(syntheticEvent);
    }
  };

  return (
    <>
      <Input
        ref={mergeRefs(inputRef, ref)}
        className="hidden"
        type="file"
        onChange={handleOnChange}
        {...props}
      ></Input>
      <div
        className={cn(
          "flex text-foreground items-center justify-center h-full border-accent border-2 rounded-lg hover:bg-accent cursor-pointer",
          Selected && showSelected
            ? "bg-green-800 hover:bg-green-600 text-background opacity-50"
            : "",
          DragEnter ? "border-blue-500" : "",
          className,
        )}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p className="text-sm font-light select-none">
          {Selected && showSelected ? "Selected" : "Drag and Drop"}
        </p>
      </div>
    </>
  );
});

f.displayName = "DragAndDropInput";

export default f;
