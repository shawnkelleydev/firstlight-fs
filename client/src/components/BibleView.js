import Interweave from "interweave";

export default function BibleView(props) {
  return (
    <div className="BibleView">
      <Interweave content={props.passage} />
    </div>
  );
}
