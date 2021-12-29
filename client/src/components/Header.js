//dependencies
import { useEffect, useState } from "react";

//children
import Ham from "./Ham";

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
      <h1>First Light</h1>
      <Ham click={() => handleHam()} isHam={isHam} />
    </header>
  );
}
