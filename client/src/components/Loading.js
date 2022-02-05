import { useEffect, useState } from "react";

export default function Loading() {
  const [count, setCount] = useState(null);
  const [dots, setDots] = useState("•");

  useEffect(() => {
    setCount(1);
    return () => setCount(null);
  }, []);

  useEffect(() => {
    if (count) {
      function plusOne() {
        setCount(count > 3 ? 1 : count + 1);
      }
      setTimeout(plusOne, 300);
    }
  }, [count]);

  useEffect(() => {
    if (count) {
      setDots(count === 3 ? "•••" : count === 2 ? "••" : "•");
    }
  }, [count]);

  return (
    <div className="Loading">
      <h1>Loading</h1>
      <h3>{dots}</h3>
    </div>
  );
}
