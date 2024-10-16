import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "lib/utils";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui";
import { useState } from "react";

interface IProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export const DatePicker = ({ value, onChange }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={date => {
            onChange(date)
            setOpen(false)
          }}
          
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
