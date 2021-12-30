//children
import Ham from "./Ham";
import Menu from "./Menu";
import Logo from "./Logo";

export default function Header(props) {
  return (
    <header className="Header">
      <Logo />
      <Ham click={() => props.handleHam()} isHam={props.isHam} />
      <Menu
        isHam={props.isHam}
        user={props.user}
        reset={() => props.setIsHam(true)}
        signOut={props.signOut}
      />
    </header>
  );
}
