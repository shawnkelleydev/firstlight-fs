import { useRef, useState } from "react";
import "./styles.css";

export default function AddNote(props) {
  const input = useRef(null);

  const [warning, setWarning] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        props.addNote(e);
        input.current.focus();
        if (props.text === "") {
          setWarning(true);
        } else {
          props.setText("");
          setWarning(false);
        }
      }}
      className={props.show ? "AddNote" : "AddNote hide"}
    >
      <textarea
        className="textarea"
        onChange={(e) => props.setText(e.target.value)}
        ref={input}
        value={props.text}
      />
      <button className="add-note" type="submit">
        +
      </button>
      <p className={warning ? "warning" : "hide"}>Please enter text.</p>
    </form>
  );
}
