import Interweave from "interweave";

export default function SpaceCaption(props) {
  return (
    <div className="caption-container">
      <div className={props.showDesc ? "caption" : "caption hide-caption"}>
        <div className="caption-buttons">
          <button className="get-space-pic" onClick={props.setSpacePic}>
            get pic &rarr;
          </button>
          <button className="get-space-pic" onClick={props.setShowDesc}>
            {props.showDesc ? "hide caption" : "show caption"}
          </button>
        </div>
        <h3>{props.spacePicTitle}</h3>
        <div className="desc-div">
          {props.spacePicTitle !== props.spacePicDesc ? (
            <Interweave content={props.spacePicDesc} />
          ) : null}
        </div>
      </div>
    </div>
  );
}