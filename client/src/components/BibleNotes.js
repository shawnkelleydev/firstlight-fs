import { useEffect, useState } from "react";

//children
import Note from "./Note";
import AddNote from "./AddNote";

export default function BibleNotes(props) {
  //notes
  const [notes, setNotes] = useState([]);
  //control
  const [text, setText] = useState("");
  //animation
  const [show, setShow] = useState(false);
  //citation
  const [citation, setCitation] = useState(null);
  //set local citation state with proper formatting
  useEffect(() => {
    //grab citation / correct
    let cit = props.canonical;
    if (cit) {
      if (cit.includes(":")) {
        cit = cit.split(":")[0];
      }
      setCitation(cit);
    }
  }, [props.canonical]);

  //presentable citation

  function addNote(e) {
    e.preventDefault();
    //conditional add (no blanks)
    if (text.length > 0) {
      let id = Math.floor(Math.random() * 100000).toFixed(0);
      let note = text;
      //tags with current citation reference (coded bookchapter)
      note = {
        note,
        id,
        citation,
      };
      setNotes([...notes, note]);
    }
  }

  function handleDelete(e) {
    const id = e.target.id;
    setNotes([...notes.filter((note) => note.id !== id)]);
  }

  function handleEdit(e) {
    e.preventDefault();
    const id = e.target.getAttribute("data");
    let note = e.target.querySelector("textarea").value;
    let citation = notes.filter((note) => note.id === id)[0].citation;
    note = { note, id, citation };
    //remove old note, set new
    setNotes([...notes.filter((note) => note.id !== id), note]);
  }

  return (
    <div className={props.noResults ? "hide-bible-notes" : "BibleNotes"}>
      <div className="notes-header">
        <p className="warning">this feature is under construction</p>
        <h2>
          Notes from <span className="cap">{citation}</span>
        </h2>
        <div className="show-add-note-div">
          <button
            className={show ? "highlight show-add-note" : "show-add-note"}
            onClick={() => setShow(!show)}
          >
            {show ? "-" : "+"}
          </button>
        </div>
      </div>

      <AddNote
        setText={(e) => setText(e.target.value)}
        addNote={(e) => addNote(e)}
        show={show}
        text={text}
      />
      <ul className="notes">
        {notes.length > 0
          ? notes
              .filter(
                (note) => note.citation.toLowerCase() === citation.toLowerCase()
              )
              .map((note, i) => {
                return (
                  <Note
                    note={note.note}
                    id={note.id}
                    key={i}
                    delete={(e) => handleDelete(e)}
                    edit={(e) => handleEdit(e)}
                  />
                );
              })
          : null}
      </ul>
    </div>
  );
}
