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
        style={{ backgroundImage: `url(${props.APOD})` }}
      >
        {/* <img
          src={props.APOD}
          alt="nasa astronmy picture of the day"
          className="APOD"
        /> */}

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
          <p>Image: {props.APODtitle}, Courtesy of NASA APOD</p>
        </span>
      </div>
    </div>
  );
}
