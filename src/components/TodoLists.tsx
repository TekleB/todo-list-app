import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
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
import ModifyTodo from "@/components/ModifyTodo";
import { Loader2 } from "lucide-react";
import { Todo, UserInfo } from "@/types";
import { fetchTodos } from "@/api/todoApiService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const TodoLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "dueDate", order: "asc" });

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  const handleNewTodo = () => {
    setRefresh((prev) => !prev);
  };

  const handleSortChange = (value: string) => {
    const [order, field] = value.split(/(?=[A-Z])/);
    setSortCriteria({ field, order: order as "asc" | "desc" });
  };

  useEffect(() => {
    // Fetch todos when the component mounts or refresh changes
    const getTodos = async () => {
      try {
        const data = await fetchTodos(userInfo.token, navigate, dispatch);
        setTodos(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, [refresh]);

  const sortedTodos = [...todos].sort((a, b) => {
    let comparison = 0;
    if (sortCriteria.field === "dueDate") {
      comparison =
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortCriteria.field === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortCriteria.field === "status") {
      comparison = Number(a.status) - Number(b.status);
    }
    return sortCriteria.order === "asc" ? comparison : -comparison;
  });

  return (
    <section className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Loader2
            className="animate-spin mt-16 mx-auto text-emerald-600"
            size={70}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-emerald-600 sm:text-5xl">
                Your Todos ):
              </h2>
              <ModifyTodo onCreateUpdateTodo={handleNewTodo} />
            </div>

            <div className="flex items-center mb-10 gap-4  bg-gray-100 py-5 justify-center rounded-lg flex-wrap">
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500 bg-emerald-600 text-gray-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ascending</SelectLabel>
                    <SelectItem value="ascdueDate">Due Date</SelectItem>
                    <SelectItem value="asctitle">Title</SelectItem>
                    <SelectItem value="ascstatus">Status</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Descending</SelectLabel>
                    <SelectItem value="descdueDate">Due Date</SelectItem>
                    <SelectItem value="desctitle">Title</SelectItem>
                    <SelectItem value="descstatus">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500 bg-emerald-600 text-gray-100">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <DateRangePicker />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 align-middle justify-items-center gap-y-6 md:gap-x-7">
              {sortedTodos.length ? (
                sortedTodos.map((todo) => (
                  <TodoList key={todo.id} todo={todo} />
                ))
              ) : (
                <div className="mx-auto text-gray-500 text-3xl font-semibold col-span-3">
                  No data available
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default TodoLists;
