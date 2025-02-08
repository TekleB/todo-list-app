import { Todo, UpdateAPIAction } from "@/types";
import { NavigateFunction } from "react-router";
import { logout } from "@/store/slices/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Fetch todos from the API
export const fetchTodos = async (
  token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch
): Promise<Todo[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired!", {
        description: "Please login again!",
      });
    }

    return res.json();
  } catch (error) {
    if (!navigator.onLine) {
      toast.error("Network error!", {
        description: "You are offline. Please check your internet connection.",
      });
    } else {
      toast.error("Failed to fetch todos", {
        description: "Please try again!",
      });
    }
    throw error;
  }
};

// Add a new todo to the API
export const addTodos = async (
  token: string,
  title: string,
  dueDate: Date,
  description: string,
  navigate: NavigateFunction,
  dispatch: Dispatch
): Promise<Todo | undefined> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, dueDate, description }),
    });

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired!", {
        description: "Please login again!",
      });

      return;
    }

    if (res.status === 409) {
      toast.error("Duplicate Todo", {
        description: "Todo with this title already exists!",
      });

      return;
    }

    return res.json();
  } catch (error) {
    if (!navigator.onLine) {
      toast.error("Network error!", {
        description: "You are offline. Please check your internet connection.",
      });
    } else {
      toast.error("Failed to create todo", {
        description: "Please try again!",
      });
    }
    throw error;
  }
};

// Fetch a single todo by ID from the API
export const fetchTodoById = async (
  token: string,
  id: string | undefined,
  navigate: NavigateFunction,
  dispatch: Dispatch
): Promise<Todo | undefined> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired!", {
        description: "Please login again!",
      });

      return;
    }

    if (res.status === 404) {
      toast.error("Todo not found!", {
        description: "Unable to found this todo. Please try again!",
      });

      return;
    }

    return res.json();
  } catch (error) {
    if (!navigator.onLine) {
      toast.error("Network error!", {
        description: "You are offline. Please check your internet connection.",
      });
    } else {
      toast.error("Failed to fetch todo", {
        description: "Please try again!",
      });
    }
    throw error;
  }
};

// Delete a single todo by ID from the API
export const deleteTodoById = async (
  token: string,
  id: string | undefined,
  navigate: NavigateFunction,
  dispatch: Dispatch
): Promise<void> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired!", {
        description: "Please login again!",
      });

      return;
    }

    if (res.status === 404) {
      toast.error("Todo not found!", {
        description: "Todo not found or not authorized. Please try again!",
      });

      return;
    }

    if (res.status === 200) {
      toast.success("Todo deleted successfully!", {
        description: "You have deleted a todo successfully!",
      });
    }
  } catch (error) {
    if (!navigator.onLine) {
      toast.error("Network error!", {
        description: "You are offline. Please check your internet connection.",
      });
    } else {
      toast.error("Failed to delete todo", {
        description: "Please try again!",
      });
    }
    throw error;
  }
};

// Update a single todo by ID from the API
export const updateTodoById = async (
  token: string,
  id: string | undefined,
  todo: Todo | undefined,
  type: UpdateAPIAction,
  navigate: NavigateFunction,
  dispatch: Dispatch
): Promise<Todo | undefined> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo?.title,
        dueDate: todo?.dueDate,
        description: todo?.description,
        status: type === "update" ? todo?.status : false,
      }),
    });

    if (res.status === 401) {
      dispatch(logout());
      navigate("/login");
      toast.error("Session expired!", {
        description: "Please login again!",
      });

      return;
    }

    if (res.status === 404) {
      toast.error("Todo not found!", {
        description: "Todo not found or not authorized. Please try again!",
      });

      return;
    }

    if (res.status === 409) {
      toast.error("Duplicate Todo", {
        description: "Todo with this title already exists!",
      });

      return;
    }

    if (res.status === 200) {
      if (type === "update") {
        toast.success("Todo updated successfully!", {
          description: "You have updated a todo successfully!",
        });
      } else {
        toast.success("Todo completed successfully!", {
          description: "You have marked a todo completed successfully!",
        });
      }
    }

    return res.json();
  } catch (error) {
    if (!navigator.onLine) {
      toast.error("Network error!", {
        description: "You are offline. Please check your internet connection.",
      });
    } else {
      toast.error("Failed to update todo", {
        description: "Please try again!",
      });
    }
    throw error;
  }
};
