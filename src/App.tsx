import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/HomePage";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
