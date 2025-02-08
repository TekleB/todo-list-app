import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import TodoLists from "@/components/TodoLists";
import store from "@/store";
import { fetchTodos } from "@/api/todoApiService";
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

const mockTodos: Todo[] = [
  {
    id: "1",
    title: "Test Todo 1",
    dueDate: "2023-10-01",
    status: true,
    description: "Description 1",
    updatedAt: "2023-09-01",
  },
  {
    id: "2",
    title: "Test Todo 2",
    dueDate: "2023-10-02",
    status: false,
    description: "Description 2",
    updatedAt: "2023-09-02",
  },
];

describe("TodoLists Component", () => {
  beforeEach(() => {
    (fetchTodos as Mock).mockResolvedValue(mockTodos);
    (useSelector as unknown as Mock).mockReturnValue({
      userInfo: { token: "mock-token" },
    });
  });

  it("renders loading spinner initially", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoLists />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders todos after loading", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoLists />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("Test Todo 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Todo 2")).toBeInTheDocument();
  });

  it("filters todos based on search query", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoLists />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = await screen.findByPlaceholderText("Search todos");
    fireEvent.change(searchInput, { target: { value: "Test Todo 1" } });

    expect(await screen.findByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument();
  });
});
