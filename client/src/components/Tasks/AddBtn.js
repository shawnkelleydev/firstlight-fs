export default function AddBtn(props) {
  return (
    <button
      onClick={() => props.cb()}
      className={props.add ? "AddBtn AddBtn-x" : "AddBtn"}
    >
      <span></span>
      <span></span>
    </button>
  );
}
