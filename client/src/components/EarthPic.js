import { useState } from "react";

export default function EarthPic(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="EarthPic">
      <img
        src={props.pic}
        className="nasa-earth-pic"
        alt={`Earth on ${props.date}`}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      <p className={show ? "p" : "p hide-left"}>
        Image taken by NASA's DSCOVR spacecraft on {props.date}
      </p>
    </div>
  );
}
