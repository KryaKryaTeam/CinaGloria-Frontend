"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Calendar } from "../calendar";

interface DatePickerPopoverProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export default function DatePickerPopover({
  value,
  onChange,
}: DatePickerPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => date && onChange?.(date)}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}
