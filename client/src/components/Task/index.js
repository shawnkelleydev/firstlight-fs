import "./styles.css";

export default function Task(props) {
  return (
    <div className="Task">
      <label>
        <input
          type="checkbox"
          onChange={() => props.handleChange(props.task)}
          checked={props.task.isChecked}
        />
        <p className={props.task.isChecked ? "cross-out" : null}>
          {props.task.text}
        </p>
      </label>
      <button
        id={props.task.id}
        list={props.task.list}
        onClick={(e) => props.delete(e)}
      >
        x
      </button>
    </div>
  );
}
