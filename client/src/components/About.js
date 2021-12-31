//children
import EarthPic from "./EarthPic";
import AppDesc from "./AppDesc";
//component
export default function About(props) {
  return (
    <div className="About">
      <EarthPic pic={props.pic} date={props.date} />
      <AppDesc />
    </div>
  );
}
