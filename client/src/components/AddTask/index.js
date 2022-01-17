import { useState } from "react";
import "./styles.css";

export default function AddTask(props) {
  const [input, setInput] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="AddTask">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input !== "") {
            setShowWarning(false);
            let id = Math.random() * 1000000;
            id = id.toFixed(0);
            let text = input;
            let list = props.list;
            let isChecked = false;
            let isPriority = false;
            let timeStamp = Date.now();
            let task = {
              text,
              id,
              list,
              isChecked,
              isPriority,
              timeStamp,
            };
            props.set([...props.prev, task]);
            localStorage.setItem(id, [
              text,
              list,
              isChecked,
              isPriority,
              timeStamp,
            ]);
            setInput("");
          } else {
            setShowWarning(true);
          }
        }}
      >
        {/* label for accessibility */}
        <label htmlFor="taskInput">Task:</label>
        <div>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            id="taskInput"
          />
          <button type="submit">+</button>
        </div>
      </form>
      <p
        className={
          showWarning ? "input-warning" : "input-warning hide-input-warning"
        }
      >
        Please provide input.
      </p>
    </div>
  );
}
