import { useRef } from "react";

export default function AddNote(props) {
  const input = useRef(null);

  return (
    <form
      onSubmit={(e) => {
        props.addNote(e);
        input.current.value = "";
        input.current.focus();
      }}
      className={props.show ? "form" : "form hide"}
    >
      <textarea
        className="textarea"
        onChange={props.setText}
        ref={input}
        value={props.text}
      />
      <button className="add-note" type="submit">
        submit
      </button>
    </form>
  );
}
