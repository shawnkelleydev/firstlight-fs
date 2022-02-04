export default function Ham(props) {
  return (
    <ul
      className={props.hide ? "Ham Ham-hide" : props.active ? "Ham Ham-active" : "Ham"}
      onClick={() => props.setActive(!props.active)}
    >
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
