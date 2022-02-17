import Star from "./Star";

export default function Task(props) {
  return (
    <li className="Task">
      <label className={props.task.complete ? "complete" : null}>
        <input
          type="checkbox"
          checked={props.task.complete ? true : false}
          onChange={() => props.handleComplete(props.task)}
        />
        {props.task.text}
      </label>
      <span>
        <button
          onClick={() => props.handleStar(props.task)}
          className={props.task.star ? "star star-active" : "star"}
        >
          <Star />
        </button>
        <button onClick={() => props.deleteTask(props.task)}>X</button>
      </span>
    </li>
  );
}
