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
import { Input } from "@/components/ui/input";

const TodoLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [sortCriteria, setSortCriteria] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({ field: "dueDate", order: "asc" });

  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  // Handle new todo creation or update
  const handleNewTodo = () => {
    setRefresh((prev) => !prev);
  };

  // Handle sort criteria change
  const handleSortChange = (value: string) => {
    const order = value.startsWith("asc") ? "asc" : "desc";
    const field = value.replace(/^(asc|desc)/, "");
    setSortCriteria({ field, order: order as "asc" | "desc" });
  };

  // Handle date range change
  const handleDateRangeChange = (range: {
    from: Date | null;
    to: Date | null;
  }) => {
    setDateRange(range);
  };

  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

  // Sort todos based on the selected criteria
  const sortedTodos = [...todos].sort((a, b) => {
    let comparison = 0;

    if (sortCriteria.field === "dueDate") {
      comparison =
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortCriteria.field === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortCriteria.field === "status") {
      comparison = Number(a.status) - Number(b.status); // Convert boolean to numbers (false = 0, true = 1)
    }

    return sortCriteria.order === "asc" ? comparison : -comparison;
  });

  // Filter todos based on the selected date range and status
  const filteredTodos = sortedTodos
    .filter((todo) => {
      if (!dateRange.from || !dateRange.to) return true;

      const dueDate = new Date(todo.dueDate);
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999); // Include the entire last day

      return dueDate >= dateRange.from && dueDate <= endDate;
    })
    .filter((todo) => {
      if (statusFilter === "all") return true;
      return statusFilter === "active" ? todo.status : !todo.status;
    });

  // Filter todos based on the search query
  const searchedTodos = filteredTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        {loading ? (
          <Loader2
            data-testid="loading-spinner"
            className="animate-spin mt-16 mx-auto text-emerald-600 dark:text-emerald-500"
            size={70}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-emerald-600 sm:text-5xl dark:text-emerald-500">
                Your Todos :)
              </h2>
              <ModifyTodo onCreateUpdateTodo={handleNewTodo} />
            </div>

            <div className="bg-gray-100 dark:bg-slate-800 py-5 justify-center rounded-lg grid grid-cols-2 px-5 mb-10">
              <div className="flex items-center  gap-4">
                <Select onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] focus:outline-none  bg-emerald-600 text-gray-100 focus:ring-transparent">
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
                <Select
                  onValueChange={handleStatusFilterChange}
                  defaultValue={"all"}
                >
                  <SelectTrigger className="w-[180px] focus:outline-none focus:ring-transparent bg-emerald-600 text-gray-100">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent
                    className=""
                    onClick={(data) => console.log(data)}
                  >
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <DateRangePicker
                  onChange={(dateRange) =>
                    handleDateRangeChange(
                      dateRange as { from: Date | null; to: Date | null }
                    )
                  }
                />
              </div>

              <Input
                type="text"
                placeholder="Search todos"
                value={searchQuery}
                onChange={handleSearchChange}
                className=" border border-emerald-500 placeholder-gray-500 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                        dark:focus:ring-emerald-500 dark:focus:border-emerald-500
                        focus:z-10 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 align-middle justify-items-center gap-y-6 md:gap-x-7">
              {searchedTodos.length ? (
                searchedTodos.map((todo) => (
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
