import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

//children
import NoteButtons from "./NoteButtons";
import EditForm from "./EditForm";

export default function Note(props) {
  const [edit, setEdit] = useState(false);
  const [seeButtons, setSeeButtons] = useState(false);
  const [text, setText] = useState("");

  //initial set text in state
  useEffect(() => {
    const note = props.note;
    setText(note);
  }, [props.note]);

  return (
    <li>
      <div className={edit ? "markdown hide" : "markdown"}>
        <ReactMarkdown children={props.note} />
      </div>
      <EditForm
        edit={edit}
        submit={props.edit}
        text={text}
        setText={(e) => setText(e.target.value)}
        id={props.id}
        setEdit={setEdit}
        seeButtons={setSeeButtons}
      />
      {seeButtons ? (
        <NoteButtons
          delete={props.delete}
          seeButtons={setSeeButtons}
          setEdit={setEdit}
          edit={edit}
          seeButtons={() => setSeeButtons(false)}
          id={props.id}
        />
      ) : (
        <div className="note-buttons">
          <button className="points" onClick={() => setSeeButtons(true)}>
            ...
          </button>
        </div>
      )}
    </li>
  );
}
