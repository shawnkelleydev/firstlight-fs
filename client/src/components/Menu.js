import { NavLink } from "react-router-dom";

export default function Menu(props) {
  const pages = ["bible", "tasks", "space"];

  return (
    <nav
      className={props.active ? "nav" : "nav nav-hide"}
      onClick={() => props.setActive(false)}
    >
      {pages.map((item, i) => (
        <NavLink
          to={item.includes("tasks") ? `/${item}/kanban` : `/${item}`}
          key={i}
        >
          {item}
        </NavLink>
      ))}
    </nav>
  );
}
