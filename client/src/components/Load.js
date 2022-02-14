import { useEffect, useState } from "react";

export default function Load() {
  const [trans, setTrans] = useState(false);
  const [poof, setPoof] = useState(false);

  useEffect(() => {
    function transTrue() {
      setTrans(true);
    }

    setTimeout(transTrue, 1500);
  }, []);

  useEffect(() => {
    function poofTrue() {
      setPoof(true);
    }
    if (trans) {
      setTimeout(poofTrue, 1000);
    }
  }, [trans]);

  return !poof ? (
    <div className={!trans ? "Load" : "Load trans"}>
      <h2>
        Welcome to First
        <span className={trans ? "span span-trans" : "span"}>Light</span>
      </h2>
    </div>
  ) : null;
}
