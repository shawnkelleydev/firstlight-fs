export default function NoteButtons(props) {
  return (
    <div className="note-buttons">
      <button
        className="button"
        id={props.id}
        onClick={(e) => {
          props.delete(e);
          props.seeButtons(false);
          props.setEdit(false);
        }}
      >
        del
      </button>
      <button
        ref={props.subRef}
        className={props.edit ? "button highlight" : "button"}
        id={props.id}
        onClick={() => {
          props.setEdit(true);
        }}
      >
        edit
      </button>{" "}
      <button className="button" onClick={props.seeButtons}>
        hide
      </button>
    </div>
  );
}
