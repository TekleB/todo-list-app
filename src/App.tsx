import { Routes, Route } from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import TodoListPage from "@/pages/TodoListPage";

const App = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="todos/:id" element={<TodoListPage />} />
      </Route>
    </Routes>
  );
};

export default App;
