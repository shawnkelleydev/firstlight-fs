import { useEffect, useState } from "react";

//children
import Note from "./Note";
import AddNote from "./AddNote";

export default function BibleNotes(props) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [citation, setCitation] = useState(null);
  const [presentableCitation, setPresentableCitation] = useState(null);

  //set local citation state with proper formatting
  useEffect(() => {
    //grab citation / correct
    let citation = props.citation;
    const regex = /[1-9]/;
    //add chapter / remove verses
    citation = citation.toLowerCase();
    citation = !citation.match(regex)
      ? (citation += "1")
      : citation.includes(":")
      ? citation.split(":")[0]
      : citation;
    //remove spaces -- .replace() was only removing first space for some reason
    if (citation.includes(" ")) {
      citation = citation.split(" ").reduce((acc, letter) => (acc += letter));
    }
    setCitation(citation);
    //format bookchapter (no spaces, no verses) -- notes will be matched in this way
  }, [props.citation]);

  //presentable citation
  useEffect(() => {
    if (citation) {
      let book = citation.match(/[a-z]+/)[0];
      let chapter = citation.match(/[1-9]+/)[0];
      let presentable = book + " " + chapter;
      setPresentableCitation(presentable);
    }
  }, [citation]);

  useEffect(() => {
    console.log(presentableCitation);
  }, [presentableCitation]);

  function addNote(e) {
    e.preventDefault();
    //conditional add (no blanks)
    if (text.length > 0) {
      let id = Math.floor(Math.random() * 100000).toFixed(0);
      let note = text;
      //tags with current citation reference (coded bookchapter)
      note = { note, id, citation };
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
    note = { note, id };
    //remove old note, set new
    setNotes([...notes.filter((note) => note.id !== id), note]);
  }

  return (
    <div className="BibleNotes">
      <div className="notes-header">
        <h1>
          Notes from <span className="cap">{presentableCitation}</span>
        </h1>
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
        {notes
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
          })}
      </ul>
    </div>
  );
}
