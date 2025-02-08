import { Link } from "react-router";
import { HourglassIcon, SquareCheckBigIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Todo } from "@/types";
import { format } from "date-fns";

const TodoList = ({ todo }: { todo: Todo }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md relative w-[85%] md:w-full transform transition duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
      <div className="p-4">
        <div className="mb-6 flex flex-row justify-between items-center">
          <h3
            className={`text-xl font-bold ${
              !todo.status ? "line-through" : ""
            }`}
          >
            {todo.title}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <div className="text-gray-600 my-2">
                <TooltipTrigger>
                  {!todo.status ? (
                    <SquareCheckBigIcon className="text-emerald-500" />
                  ) : (
                    <HourglassIcon className="text-orange-500" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{!todo.status ? "Completed" : "Pending"}</p>
                </TooltipContent>
              </div>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mb-5 line-clamp-3 font-extralight tracking-wide">
          {todo.description}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col  justify-between mb-4">
          <div className="text-gray-600 dark:text-gray-400 mb-3 font-extralight tracking-wide">
            <span className="font-medium">Due Date :- </span>
            {format(new Date(todo.dueDate), "EEEE, dd, yyyy 'at' ha")}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mb-3 font-extralight tracking-wide">
            <span className="font-medium">Updated At :- </span>
            {format(new Date(todo.updatedAt), "EEEE, dd, yyyy 'at' ha")}
          </div>
          <Link
            to={`/todos/${todo.id}`}
            className="h-[36px] bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View detail
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
