import "./styles.css";
import { useState } from "react";

export default function Task(props) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="Task">
      <label>
        <input type="checkbox" onChange={() => setChecked(!checked)} />
        <p className={checked ? "cross-out" : null}>{props.task.text}</p>
      </label>
      <button
        id={props.task.id}
        list={props.task.list}
        onClick={(e) => props.delete(e)}
      >
        x
      </button>
    </div>
  );
}
