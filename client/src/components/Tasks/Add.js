import { useEffect, useState } from "react";

import AddBtn from "./AddBtn";
import Submit from "./Submit";

export default function Add(props) {
  const [add, setAdd] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const ssTrue = () => {
      setShowSubmit(true);
    };
    if (add) {
      setTimeout(ssTrue, 100);
    } else {
      setShowSubmit(false);
    }
  }, [add]);

  function toggleBtn() {
    if (!add) {
      // activate effect above
      setAdd(true);
    } else {
      //hide form
      setShowSubmit(false);
      //poof form
      const addFalse = () => setAdd(false);
      setTimeout(addFalse, 100);
    }
  }
  return (
    <div className="Add">
      {add ? (
        <Submit
          cb={props.submit}
          input={props.input}
          setInput={props.setInput}
          warn={props.warn}
          label={props.label}
          class={showSubmit ? "Submit-in" : null}
        />
      ) : null}
      <h2 className={showSubmit ? "h2-hide" : null}>add {props.label}</h2>
      <AddBtn add={add} cb={toggleBtn} />
    </div>
  );
}
