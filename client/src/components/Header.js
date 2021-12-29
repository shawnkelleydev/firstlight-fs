//dependencies
import { useEffect, useState } from "react";

//children
import Ham from "./Ham";
import Menu from "./Menu";
import Logo from "./Logo";

export default function Header(props) {
  const [isHam, setIsHam] = useState(true);

  function handleHam() {
    setIsHam(!isHam);
  }

  useEffect(() => {
    if (isHam) {
      console.log("ham!");
    } else {
      console.log("X!");
    }
  }, [isHam]);

  return (
    <header className="Header">
      <Logo />
      <Ham click={() => handleHam()} isHam={isHam} />
      <Menu
        isHam={isHam}
        user={props.user}
        reset={() => setIsHam(true)}
        signOut={props.signOut}
      />
    </header>
  );
}
