import TodoList from "@/components/TodoList";
import TodoListData from "@/assets/todos.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import DateRangePicker from "@/components/ui/date-range-picker";

const TodoLists = () => {
  return (
    <section className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold text-emerald-600 ">
            Your Todos ):
          </h2>
          <Button className="group relative w-[140px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <Plus /> New Todo
          </Button>
        </div>

        <div className="flex items-center mb-10 space-x-4">
          <Select>
            <SelectTrigger className="w-[180px] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500 bg-emerald-600 text-gray-100">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="dueDate">All</SelectItem>
              <SelectItem value="title">Active</SelectItem>
              <SelectItem value="status">Completed</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker />
          <Select>
            <SelectTrigger className="w-[180px] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500 bg-emerald-600 text-gray-100">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ascending</SelectLabel>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Descending</SelectLabel>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  align-middle justify-items-center gap-y-6 md:gap-x-7">
          {TodoListData.todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TodoLists;
