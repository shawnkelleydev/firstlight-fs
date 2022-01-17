import { useEffect, useState } from "react";

export default function BibleWelcome(props) {
  // let citation = props.vodCit;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="BibleWelcome">
      <div
        className="APOD-div"
        style={{
          backgroundImage: props.APOD ? `url(${props.APOD.url})` : null,
        }}
      >
        <div
          className={
            show ? "bible-welcome caption" : "transparent bible-welcome"
          }
        >
          <span>Welcome to the Bible!</span>
          <span>To start reading, use the menu below.</span>
        </div>
        <span
          className={show ? "apod-title caption" : "transparent apod-title"}
        >
          <p>
            {props.APOD
              ? `Background: ${props.APOD.title}, Courtesy of NASA APOD.`
              : null}
          </p>
        </span>
      </div>
    </div>
  );
}
