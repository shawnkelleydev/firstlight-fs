import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

//children
import NoteButtons from "./NoteButtons";
import EditForm from "./EditForm";

export default function Note(props) {
  const [edit, setEdit] = useState(false);
  const [seeButtons, setSeeButtons] = useState(false);
  const [text, setText] = useState("");

  //initial set text in state for editing
  useEffect(() => {
    const note = props.note.note;
    setText(note);
  }, [props.note]);

  useEffect(() => {
    if (!seeButtons) {
      setEdit(false);
    }
  }, [seeButtons]);

  return (
    <li>
      <div className={edit ? "markdown hide" : "markdown"}>
        <ReactMarkdown children={props.note.note} />
      </div>
      <EditForm
        edit={edit}
        submit={props.edit}
        note={props.note}
        text={text}
        setText={(e) => setText(e.target.value)}
        setEdit={setEdit}
        seeButtons={setSeeButtons}
      />
      {seeButtons ? (
        <NoteButtons
          delete={props.delete}
          seeButtons={() => setSeeButtons(false)}
          setEdit={() => setEdit(!edit)}
          edit={edit}
          note={props.note}
        />
      ) : (
        <div className="note-buttons">
          <button className="points" onClick={() => setSeeButtons(true)}>
            •••
          </button>
        </div>
      )}
    </li>
  );
}
