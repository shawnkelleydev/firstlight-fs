import Interweave from "interweave";

//children
import BibleNotes from "./BibleNotes";

export default function BibleView(props) {
  const passage = props.passage;

  return (
    <div
      className="BibleView"
      style={{ backgroundImage: `url(${props.APOD})` }}
    >
      <div className="reading-div">
        <Interweave content={passage} />
      </div>
      <div className="user-stuff-container">
        <BibleNotes citation={props.citation} />
      </div>
    </div>
  );
}
