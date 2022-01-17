import "./styles.css";

export default function EditForm(props) {
  return (
    <form
      className={props.edit ? "EditForm" : "EditForm hide"}
      onSubmit={(e) => {
        e.preventDefault();
        props.submit(e);
        props.setEdit(false);
        props.seeButtons(false);
      }}
      id={props.note.id}
      stamp={props.note.timeStamp}
    >
      <textarea
        value={props.text}
        onChange={props.setText}
        className="edit-textarea"
      />
      <button className="submit-edits" type="submit">
        +
      </button>
    </form>
  );
}
