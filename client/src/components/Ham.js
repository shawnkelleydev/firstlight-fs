export default function Ham(props) {
  return (
    <ul className={props.isHam ? "Ham" : "Ham X"} onClick={props.click}>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
