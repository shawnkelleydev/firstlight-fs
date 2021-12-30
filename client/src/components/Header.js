//children
import Ham from "./Ham";
import Menu from "./Menu";
import Logo from "./Logo";

export default function Header(props) {
  return (
    <header className="Header">
      <Logo show={props.show} />
      <Ham
        click={() => props.handleHam()}
        isHam={props.isHam}
        show={props.show}
      />
      <Menu
        isHam={props.isHam}
        user={props.user}
        reset={() => props.setIsHam(true)}
        signOut={props.signOut}
        show={props.show}
      />
    </header>
  );
}
