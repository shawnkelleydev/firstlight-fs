//dependencies
import Interweave from "interweave";
import { useEffect, useState } from "react";

//component
export default function VOD(props) {
  const [citation, setCitation] = useState(null);

  //syncs display of new citation with new verse load
  useEffect(() => {
    const propCit = props.vodCit.replace("+", " ");
    setCitation(propCit);
  }, [props.vod]);

  return (
    <div className="vod-div">
      <Interweave content={props.vod} />
      <span className="p vod-cit">{citation ? citation : null} ESV</span>
      <button className="get-verse" onClick={props.getVerse}>
        get another verse &rarr;
      </button>
    </div>
  );
}
