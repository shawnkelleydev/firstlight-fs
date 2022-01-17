import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  //PARAMS
  const params = useParams();

  useEffect(() => {
    //grab citation / correct
    let cit = params.query;
    cit = !cit.match(/[0-9]/) ? cit + " 1" : cit;
    cit = cit.includes(":") ? cit.split(":")[0] : cit;
    setCitation(cit);
  }, [params]);

  // LOAD NOTES
  useEffect(() => {
    let keys = Object.keys(localStorage);
    let arr = [];
    keys.forEach((key) => {
      let id = key.split("-")[1];
      let burst = localStorage.getItem(key).split(",");
      let note = burst[0];
      let citation = burst[1];
      let timeStamp = burst[2];
      note = {
        note,
        id,
        citation,
        timeStamp,
      };
      arr.push(note);
    });
    setNotes(arr);
  }, []);

  // add note
  function addNote(e) {
    e.preventDefault();
    //conditional add (no blanks)
    if (text.length > 0) {
      let id = Math.floor(Math.random() * 100000).toFixed(0);
      let note = text;
      let timeStamp = Date.now();
      //tags with current citation reference (coded bookchapter)
      note = {
        note,
        id,
        citation,
        timeStamp,
      };
      setNotes([...notes, note]);
      // LOCAL STORAGE
      id = "bNote-" + id;
      localStorage.setItem(id, [note.note, citation, timeStamp]);
    }
  }

  function handleDelete(e) {
    let id = e.target.id;
    setNotes([...notes.filter((note) => note.id !== id)]);
    id = "bNote-" + id;
    localStorage.removeItem(id);
  }

  function handleEdit(e) {
    let id = e.target.id;
    let note = e.target.querySelector("textarea").value;
    let citation = notes.filter((note) => note.id === id)[0].citation;
    let timeStamp = e.target.getAttribute("stamp");
    note = { note, id, citation, timeStamp };
    // OUT WITH OLD / IN WITH NEW
    setNotes([...notes.filter((note) => note.id !== id), note]);
    // LOCAL STORAGE
    id = "bNote-" + id;
    localStorage.removeItem(id);
    localStorage.setItem(id, [note.note, citation, timeStamp]);
  }

  return (
    <div className={props.noResults ? "hide-bible-notes" : "BibleNotes"}>
      <div className="notes-header">
        <p className="warning" style={{ color: "yellow" }}>
          caution - under construction
        </p>
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
        setText={setText}
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
              .sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))
              .map((note, i) => {
                return (
                  <Note
                    note={note}
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
