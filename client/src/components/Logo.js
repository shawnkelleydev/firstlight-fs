import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Link to="/" className="Logo">
      <h1>
        <span className="First">First</span> Light
      </h1>
    </Link>
  );
}
