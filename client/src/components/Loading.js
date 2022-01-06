import { useState, useEffect } from "react";

export default function Loading(props) {
  const [count, setCount] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(props.passage || props.earthPic ? true : false);
    //cleanup / avoid memory leak
    return () => {
      setLoading(false);
    };
  }, [props.passage, props.earthPic]);

  //need to fix
  useEffect(() => {
    //conditional loading dots
    if (loading) {
      setPoints(count === 1 ? "•" : count === 2 ? "••" : "•••");
      setTimeout(() => {
        let n = count;
        if (n > 2) {
          n = 0;
        }
        setCount(n + 1);
      }, 333);
    }
  }, [count, loading]);

  return (
    <div className="Loading">
      <h1>Loading...</h1>
      <h2>Stand by.</h2>
      <h3>{points}</h3>
    </div>
  );
}
