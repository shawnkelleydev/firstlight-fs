//dependencies
import Interweave from "interweave";

//component
export default function VOD(props) {
  const citation = props.vodCit.replace("+", " ");
  return (
    <div className="vod-div">
      <Interweave content={props.vod} />
      <span className="p vod-cit">{citation} ESV</span>
      <button className="get-verse" onClick={props.getVerse}>
        get another verse &rarr;
      </button>
    </div>
  );
}
