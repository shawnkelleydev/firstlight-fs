export default function Ham(props) {
  return (
    <ul className={props.isHam ? "ham" : "ham X"} onClick={props.click}>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
