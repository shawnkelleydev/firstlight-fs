export default function AddTask(props) {
  return (
    <form
      className="AddTask"
      onSubmit={(e) => {
        e.preventDefault();
        props.addTask(0, 0, props.input);
      }}
    >
      <input
        type="text"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}
