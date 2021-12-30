//dependencies
import Interweave from "interweave";
import { useEffect, useState } from "react";

//component
export default function VOD(props) {
  const [show, setShow] = useState(false);

  const [citation, setCitation] = useState(null);

  //syncs display of new citation with new verse load
  useEffect(() => {
    const cit = props.vod.split(">")[1].split("<")[0];
    setCitation(cit);
  }, [props.vod]);

  useEffect(() => {
    function fire() {
      setShow(true);
    }
    //allows user to see animation on first load
    setTimeout(fire, 100);
  }, []);

  return (
    <div className={show ? "VOD show-in-place" : "VOD conceal-below"}>
      <button
        className="get-verse"
        onClick={() => {
          props.getVerse();
        }}
      >
        get another verse &rarr;
      </button>
      <Interweave content={props.vod} />
      <span className="vod-cit">{citation} ESV</span>
    </div>
  );
}
