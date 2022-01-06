import { useState, useEffect } from "react";

export default function SpaceLoading(props) {
  // LOADING
  const [count, setCount] = useState(null);
  const [points, setPoints] = useState("...");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setLoading(true);
      setShow(true);
    }
    return () => {
      isActive = false;
    };
  }, []);

  //activate count
  useEffect(() => {
    if (loading) {
      setCount(1);
    }
  }, [loading]);
  //increment count if loading
  useEffect(() => {
    let isActive = true;

    if (loading && isActive) {
      //manage elipses points
      setPoints(count === 1 ? "•" : count === 2 ? "••" : "•••");
      setTimeout(() => {
        let n = count;
        if (n > 2) {
          n = 0;
        }
        setCount(n + 1);
      }, 333);
    }

    return () => {
      isActive = false;
    };
  }, [count, loading]);

  return (
    <div className={show ? "space-content-div" : "space-content-div hide"}>
      <h2 className={"en-route"}>Getting a pic from NASA...</h2>
      <p className="en-route-p">Stand by.</p>
      <p className="en-route-p">{points}</p>
      <p className={props.error ? "warning" : "hide-error"}>
        There was an error. If nothing happens, try refreshing the page.
      </p>
    </div>
  );
}