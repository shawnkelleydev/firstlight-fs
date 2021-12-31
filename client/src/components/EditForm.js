export default function EditForm(props) {
  return (
    <form
      className={props.edit ? "edit-form" : "edit-form hide"}
      onSubmit={(e) => {
        props.submit(e);
        props.setEdit(false);
        props.seeButtons(false);
      }}
      data={props.id}
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
