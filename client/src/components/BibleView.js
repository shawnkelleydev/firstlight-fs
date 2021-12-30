import Interweave from "interweave";

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
    </div>
  );
}
