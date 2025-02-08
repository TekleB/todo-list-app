import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { addTodos, updateTodoById } from "@/api/todoApiService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { UserInfo, Todo } from "@/types";
import { useState } from "react";

// Define the schema for form validation using zod
const todoSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string(),
  dueDate: z.date({ required_error: "Due date is required" }),
});

const ModifyTodo = ({
  todo,
  onCreateUpdateTodo,
}: {
  todo?: Todo;
  onCreateUpdateTodo?: () => void;
}) => {
  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof todoSchema>) => {
    try {
      setLoading(true);

      if (todo) {
        await updateTodoById(
          userInfo.token,
          id,
          { ...todo, ...data, dueDate: data.dueDate.toISOString() },
          "update",
          navigate,
          dispatch
        );

        navigate("/");
      } else {
        const res = await addTodos(
          userInfo.token,
          data.title,
          data.dueDate,
          data.description,
          navigate,
          dispatch
        );

        if (res) {
          toast.success("Success! Your To-Do is Added 🚀", {
            description: "You’ve successfully created a new task.",
          });

          // Call the callback function to trigger re-fetching conditionally
          if (onCreateUpdateTodo) {
            onCreateUpdateTodo();
          }
        }
      }

      setOpen(false);
      form.reset();
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset({
            title: todo?.title || "",
            description: todo?.description || "",
            dueDate: todo?.dueDate ? new Date(todo.dueDate) : new Date(),
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={ todo && !todo.status}
          className={`group relative  h-[40px] flex justify-center  px-4  text-base   text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none  ${
            todo
              ? "w-full focus:shadow-outline rounded-full font-bold mt-4"
              : "w-[140px]focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 py-2 rounded-md border border-transparent font-medium"
          }`}
        >
          {todo ? "" : <Plus />} {todo ? "Edit Todo" : "New Todo"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570px]">
        <DialogHeader>
          <DialogTitle>{todo ? "Edit Todo" : "Add Todo"}</DialogTitle>
          <DialogDescription>
            {todo
              ? "Edit your task. Click save to confirm."
              : "Add a new task to your list. Click save to confirm."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                    <FormLabel htmlFor="title" className="text-right">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="title"
                        placeholder="Enter title"
                        className="col-span-3 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      />
                    </FormControl>
                    <div></div>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />

              {/* Description field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="description" className="text-right">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Type your description here."
                        className="col-span-3 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date field */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="dueDate" className="text-right">
                      Due Date
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        {...field}
                        onChange={(date) => field.onChange(date)}
                        className="col-span-3"
                        hourCycle={12}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 w-[90px]"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyTodo;
