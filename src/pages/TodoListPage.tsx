import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Todo, UserInfo } from "@/types";
import {
  fetchTodoById,
  deleteTodoById,
  updateTodoById,
} from "@/api/todoApiService";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModifyTodo from "@/components/ModifyTodo";

const TodoListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [todo, setTodo] = useState<Todo>();
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmMark, setConfirmMark] = useState(false);

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  // Fetch the todo when the component mounts or id changes
  useEffect(() => {
    const getTodo = async () => {
      try {
        const data = await fetchTodoById(
          userInfo.token,
          id,
          navigate,
          dispatch
        );
        setTodo(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    getTodo();
  }, [id, userInfo.token, navigate, dispatch]);

  // Handle delete action
  const handleDelete = async () => {
    try {
      await deleteTodoById(userInfo.token, id, navigate, dispatch);
      navigate("/");
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  // Handle mark as completed action
  const handleMark = async () => {
    try {
      await updateTodoById(
        userInfo.token,
        id,
        todo,
        "mark",
        navigate,
        dispatch
      );
      navigate("/");
    } catch (error) {
      console.log("Error updating todo", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loader2
          data-testid="loading-spinner"
          className="animate-spin text-emerald-600"
          size={70}
        />
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/"
            className="text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            <ChevronLeft className="mr-2" /> Back to Todo List
          </Link>
        </div>
      </section>

      <section className="">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md text-left">
                <h1 className="text-3xl font-bold  text-emerald-700 flex ">
                  {todo?.title}
                  {todo?.status ? (
                    <Badge
                      variant="outline"
                      className="bg-orange-500 text-white ml-1 -mb-3 self-start"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-emerald-500 text-white ml-1 -mb-3 self-start"
                    >
                      Completed
                    </Badge>
                  )}
                </h1>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-emerald-700 text-lg font-bold mb-4">
                  Description
                </h3>

                <p className="mb-4 tracking-wide dark:text-gray-300">
                  {todo?.description}
                </p>

                <h3
                  id="due-date"
                  className="text-emerald-700 font-bold mb-2 tracking-wide"
                >
                  Due Date
                </h3>

                <p
                  aria-labelledby="due-date"
                  className="mb-4 dark:text-gray-300"
                >
                  {todo?.dueDate
                    ? format(new Date(todo.dueDate), "EEEE, dd, yyyy 'at' ha")
                    : "No due date"}
                </p>
                <h3
                  id="updated-at"
                  className="text-emerald-700 font-bold mb-2 tracking-wide"
                >
                  Updated At
                </h3>

                <p
                  aria-labelledby="updated-at"
                  className="mb-4 dark:text-gray-300"
                >
                  {todo?.updatedAt
                    ? format(new Date(todo.updatedAt), "EEEE, dd, yyyy 'at' ha")
                    : "Not updated"}
                </p>
              </div>
            </main>

            <aside>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Manage Todo</h3>
                <Dialog open={confirmMark} onOpenChange={setConfirmMark}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold  px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-2  text-base"
                      disabled={!todo?.status}
                    >
                      Mark as Completed
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to mark this todo completed?</p>
                    <DialogFooter>
                      <Button
                        className="bg-gray-50 hover:bg-gray-100 text-black"
                        onClick={() => setConfirmMark(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleMark}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Mark
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <ModifyTodo todo={todo} />

                <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                  <DialogTrigger asChild>
                    <Button className="bg-red-500 hover:bg-red-600 text-white font-bold  px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4  text-base">
                      Delete Todo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this todo?</p>
                    <DialogFooter>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => setConfirmDelete(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoListPage;
