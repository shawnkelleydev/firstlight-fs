import { useState, useEffect } from "react";

export default function AboutDesc(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function fire() {
      setShow(true);
    }
    //allows user to see animation on first load
    setTimeout(fire, 100);
  }, []);

  return (
    <div
      className={show ? "AboutDesc show-in-place" : "AboutDesc conceal-below"}
    >
      <h1>about</h1>
      <p>
        <span className="First">First</span>Light is a passion project by{" "}
        <a href="https://www.shawnkelley.dev" target="_blank" rel="noreferrer">
          Shawn Kelley
        </a>{" "}
        intended to help Christians gain perspective for their day.
      </p>
      <p>
        It is under construction and will soon include spaces for Bible study,
        list capture, and generally remembering how small we are.
      </p>
      <p>
        Thanks to Crossway's ESV API, you can already access a full ESV bible
        here.
      </p>
      <p>
        <span className="First">First</span>Light. Find your way for the day.
      </p>
    </div>
  );
}
