//dependencies
import { useEffect } from "react";
import Interweave from "interweave";

export default function Earth(props) {
  return (
    <div className="Earth">
      <div className="earth-pic-div">
        <img
          src={props.pic}
          className="earthPic"
          alt={`Earth on ${props.date}`}
        />
        <p className="citation">
          Picture taken by NASA's DSCOVR spacecraft on {props.date}
        </p>
      </div>
      <div className="vod-div">
        <Interweave content={props.vod} />
        <span className="p vod-cit">{props.vodCit.replace("+", " ")} ESV</span>
        <button className="get-verse" onClick={props.getVerse}>
          get another verse &rarr;
        </button>
      </div>
    </div>
  );
}
