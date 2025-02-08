import { Routes, Route } from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import TodoListPage from "@/pages/TodoListPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="todos/:id" element={<TodoListPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
