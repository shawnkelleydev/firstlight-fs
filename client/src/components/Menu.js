import { NavLink } from "react-router-dom";

export default function Menu(props) {
  const pages = ["bible", "tasks"];

  return (
    <nav
      className={props.active ? "nav" : "nav nav-hide"}
      onClick={() => props.setActive(false)}
    >
      {pages.map((item, i) => (
        <NavLink to={`/${item}`} key={i}>
          {item}
        </NavLink>
      ))}
    </nav>
  );
}
