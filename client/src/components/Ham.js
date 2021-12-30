export default function Ham(props) {
  return (
    <ul
      className={
        props.isHam && props.show
          ? "Ham"
          : props.show
          ? "Ham X"
          : "Ham hide-right"
      }
      onClick={props.click}
    >
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
