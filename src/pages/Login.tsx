import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/store/slices/userApiSlice";
import { setUserInfo } from "@/store/slices/authSlice";
import { UserInfo, ApiError } from "@/types";
import { toast } from "sonner";

// Define the schema for form validation using zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo } }) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setUserInfo({ ...res }));
      navigate("/");
    } catch (err: unknown) {
      if ((err as ApiError).status === 404) {
        toast.error("User not found!", {
          description: "Please create an account!",
        });
        return
      }

      if ((err as ApiError).status === 403) {
        toast.error("Username or Password is not correct!", {
          description: "Please try again!",
        });
        return
      }

      toast.error("Unable to login!", {
        description: "Please try again later!",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="mt-8 mx-auto w-full sm:max-w-lg max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-emerald-600">
            Sign in
          </h2>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-2 text-gray-500 hover:text-emerald-600"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot password link */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>

              <p className="mt-2 text-center max-w">
                <Link
                  to="/signup"
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Create a new account
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
