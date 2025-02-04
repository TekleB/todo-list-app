import { useState } from "react";
import Banner from '@/components/Banner'
import Card from "@/components/Card";

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Banner />
      <h1>Vite + React</h1>
      <Card count={count} setCountFun={setCount} />
    </>
  );
};
export default HomePage;
