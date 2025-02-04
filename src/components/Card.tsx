interface CardProps {
  count: number;
  setCountFun: (value: (prevCount: number) => number) => void;
}

const Card = ({ count, setCountFun }: CardProps) => {
  return (
    <div className="card">
      <button onClick={() => setCountFun((prevCount) => prevCount + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
};

export default Card;
