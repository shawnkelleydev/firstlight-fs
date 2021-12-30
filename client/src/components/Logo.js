import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Link to="/" className={props.show ? "Logo" : "Logo hide-left"}>
      <h1>
        <span className="First">First</span> Light
      </h1>
    </Link>
  );
}
