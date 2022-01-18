import { NavLink } from "react-router-dom";

export default function Menu(props) {
  if (!props.user) {
    return (
      <nav className={props.isHam || !props.show ? "nav hide-left" : "nav"}>
        <NavLink to="/bible" onClick={props.reset}>
          bible
        </NavLink>
        <NavLink to="/tasks" onClick={props.reset}>
          tasks
        </NavLink>
        <NavLink to="/library" onClick={props.reset}>
          library
        </NavLink>
        <NavLink to="/space" onClick={props.reset}>
          space
        </NavLink>
        <NavLink to="/about" onClick={props.reset}>
          about
        </NavLink>
        <NavLink to="/auth" onClick={props.reset}>
          sign in
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className={props.isHam || !props.show ? "nav hide-left" : "nav"}>
        <NavLink to="/bible" onClick={props.reset}>
          bible
        </NavLink>
        <NavLink to="/tasks" onClick={props.reset}>
          tasks
        </NavLink>
        <NavLink to="/library" onClick={props.reset}>
          library
        </NavLink>
        <NavLink to="/space" onClick={props.reset}>
          space
        </NavLink>
        <NavLink to="/about" onClick={props.reset}>
          about
        </NavLink>
        <NavLink to="/account" onClick={props.reset}>
          account
        </NavLink>
        <NavLink
          to="/signout"
          onClick={() => {
            props.reset();
            props.signOut();
          }}
        >
          sign out
        </NavLink>
      </nav>
    );
  }
}
