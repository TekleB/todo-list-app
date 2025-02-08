import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import TodoListPage from "@/pages/TodoListPage";
import store from "@/store";
import {
  fetchTodoById,
  deleteTodoById,
  updateTodoById,
} from "@/api/todoApiService";
import { Todo } from "@/types";
import { useSelector } from "react-redux";

vi.mock("@/api/todoApiService");
vi.mock("react-redux", async () => {
  const actual = await import("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

const mockTodo: Todo = {
  id: "1",
  title: "Test Todo",
  dueDate: "2023-10-01",
  status: true,
  description: "Description",
  updatedAt: "2023-09-01",
};

describe("TodoListPage Component", () => {
  beforeEach(() => {
    (fetchTodoById as Mock).mockResolvedValue(mockTodo);
    (useSelector as unknown as Mock).mockReturnValue({
      userInfo: { token: "mock-token" },
    });
  });

  it("renders loading spinner initially", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/todos/1"]}>
          <Routes>
            <Route path="/todos/:id" element={<TodoListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders todo details after loading", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/todos/1"]}>
          <Routes>
            <Route path="/todos/:id" element={<TodoListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
    expect(
      await screen.findByText("Description", { selector: "p" })
    ).toBeInTheDocument();
    expect(await screen.findByLabelText("Due Date")).toBeInTheDocument();
    expect(await screen.findByLabelText("Updated At")).toBeInTheDocument();
  });

  it("calls deleteTodoById when delete button is clicked", async () => {
    (deleteTodoById as Mock).mockResolvedValue({});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/todos/1"]}>
          <Routes>
            <Route path="/todos/:id" element={<TodoListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = await screen.findByRole("button", {
      name: /delete todo/i,
    });
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(confirmButton);

    expect(deleteTodoById).toHaveBeenCalledWith(
      "mock-token",
      "1",
      expect.anything(),
      expect.anything()
    );
  });

  it("calls updateTodoById when mark as completed button is clicked", async () => {
    (updateTodoById as Mock).mockResolvedValue({});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/todos/1"]}>
          <Routes>
            <Route path="/todos/:id" element={<TodoListPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const markButton = await screen.findByRole("button", {
      name: /mark as completed/i,
    });
    fireEvent.click(markButton);

    const confirmButton = await screen.findByRole("button", { name: /mark/i });
    fireEvent.click(confirmButton);

    expect(updateTodoById).toHaveBeenCalledWith(
      "mock-token",
      "1",
      mockTodo,
      "mark",
      expect.anything(),
      expect.anything()
    );
  });
});
