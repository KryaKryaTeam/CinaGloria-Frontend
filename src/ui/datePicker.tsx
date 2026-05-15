"use client";

import * as React from "react";
import { Calendar } from "@/ui/calendar";
import { Field, FieldLabel } from "@/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/infrastructure/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface DatePickerProps {
  className?: string;
  value?: Date | string | null;
}

type RegisterProps = {
  onChange: (event: {
    target: { name: string; value: Date | undefined };
  }) => void;
  onBlur: (event: { target: { name: string } }) => void;
  name: string;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

// Додайте onChange та value до деструктуризації пропсів
export function DatePickerInput<T extends string>({
  className,
  onChange: onFormChange, // перейменовуємо, щоб не плутати з внутрішнім
  value: formValue,
  name,
  ...args
}: RegisterProps & DatePickerProps) {
  // Замініть any на ваш тип пропсів
  const [open, setOpen] = React.useState(false);

  // Ініціалізуємо дату з пропсів форми, якщо вона там є
  const [date, setDate] = React.useState<Date | undefined>(
    formValue ? new Date(formValue) : undefined,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Синхронізація, якщо форма змінює значення ззовні
  React.useEffect(() => {
    if (formValue && isValidDate(new Date(formValue))) {
      const d = new Date(formValue);
      setDate(d);
      setValue(formatDate(d));
    }
  }, [formValue]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setValue(formatDate(newDate));
    if (name) {
      onFormChange({
        target: {
          name: name,
          value: newDate,
        },
      });
    }
    setOpen(false);
  };

  return (
    <Field className={cn("mx-auto w-48", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <InputGroup>
          <InputGroupInput
            {...args}
            id="date-required"
            value={value}
            placeholder="Select date"
            onClick={() => setOpen(true)}
            onChange={(e) => {
              const val = e.target.value;
              setValue(val);

              if (val === "") {
                handleDateChange(undefined);
                return;
              }

              const parsedDate = new Date(val);
              if (isValidDate(parsedDate)) {
                setDate(parsedDate);
                setMonth(parsedDate);
                if (name) {
                  onFormChange({
                    target: {
                      name: name,
                      value: parsedDate,
                    },
                  });
                }
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <PopoverTrigger asChild>
              <InputGroupButton variant="ghost" size="icon-xs">
                <CalendarIcon />
              </InputGroupButton>
            </PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>

        <PopoverContent
          className="w-auto p-0"
          align="end"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("#date-required")) e.preventDefault();
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown-years"
            fromYear={1900}
            toYear={new Date().getFullYear()} // Динамічний поточний рік
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
