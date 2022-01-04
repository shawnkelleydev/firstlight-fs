import Interweave from "interweave";

export default function SpaceCaption(props) {
  return (
    <div className="caption-container">
      <div className={props.showDesc ? "caption" : "caption hide-caption"}>
        <div
          className={
            props.showDesc && window.innerWidth < 768
              ? "right"
              : "caption-buttons"
          }
        >
          <button
            className={
              props.showSpacePic ? "get-space-pic" : "get-space-pic active"
            }
            onClick={() => {
              props.newPic();
              props.setShowSpacePic();
            }}
            disabled={props.showSpacePic ? false : true}
          >
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
