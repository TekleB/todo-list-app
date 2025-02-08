import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, XCircleIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

export default function DateRangePicker({
  className,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onChange?: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  const handleClear = () => {
    setDate({
      from: undefined,
      to: undefined,
    });
    if (onChange) {
      onChange({
        from: undefined,
        to: undefined,
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] flex justify-between  rounded-md font-normal bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Filter by Due Date Range</span>
            )}
            <CalendarIcon className="h-4 w-4 text-right" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            footer={
              <Button
                className="flex relative  left-1/2 items-center mt-3 bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <XCircleIcon size={30}></XCircleIcon>
                Clear
              </Button>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
