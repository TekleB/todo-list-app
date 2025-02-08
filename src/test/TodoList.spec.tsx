import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types";

const mockTodo: Todo = {
  id: "1",
  title: "Test Todo",
  dueDate: "2023-10-01",
  status: true,
  description: "Description",
  updatedAt: "2023-09-01",
};

describe("TodoList Component", () => {
  it("renders todo item", async () => {
    render(
      <BrowserRouter>
        <TodoList todo={mockTodo} />
      </BrowserRouter>
    );

    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
    expect(await screen.findByText("Description")).toBeInTheDocument();
    expect(await screen.findByText(/Due Date :-/)).toBeInTheDocument();
    expect(await screen.findByText(/Updated At :-/)).toBeInTheDocument();
  });

  it("renders link to todo detail page", () => {
    render(
      <BrowserRouter>
        <TodoList todo={mockTodo} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /view detail/i });
    expect(link).toHaveAttribute("href", "/todos/1");
  });
});
