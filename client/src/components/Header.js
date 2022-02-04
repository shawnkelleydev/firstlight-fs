import Ham from "./Ham";
import Menu from "./Menu";

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

export default function Header() {
  const [active, setActive] = useState(false);
  // scroll
  const [pos, setPos] = useState(0);
  const [prevPos, setPrevPos] = useState(null)
  // used for hide below
  const [scrollDown, setScrollDown] = useState(false)

  useEffect(() => {
    window.onscroll = () => setPos(window.pageYOffset)
  }, [])

  useEffect(() => {
    function changePrev() {
      setPrevPos(pos);
    }
    setTimeout(changePrev, 800)
  }, [pos])

  useEffect(() => {
    function compare(cur, prev) {
      if (cur > prev + 5) {
        setScrollDown(true)
      } else if (cur < prev - 5) {
        setScrollDown(false)
      }
    }
    compare(pos, prevPos) 
  }, [pos, prevPos])

  useEffect(() => {
    if (scrollDown) {
      setActive(false)
    }
  }, [scrollDown])

  return (
    <>
      <Link to="/" className={ !scrollDown ? "logo" : "logo logo-hide" } onClick={() => setActive(false)}><h1>First<span>Light</span></h1></Link>
      <Ham active={active} setActive={setActive} hide={scrollDown} />
      <Menu active={active} setActive={setActive} hide={scrollDown} />
    </>
  );
}
