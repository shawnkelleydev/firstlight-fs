//child components
import EarthPic from "./EarthPic";
import VOD from "./VOD";

//component
export default function Earth(props) {
  return (
    <div className="Earth">
      <EarthPic pic={props.pic} date={props.date} />
      <VOD vod={props.vod} vodCit={props.vodCit} getVerse={props.getVerse} />
    </div>
  );
}
