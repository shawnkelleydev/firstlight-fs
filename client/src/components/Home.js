import Earth from "./Earth";
import Verse from "./Verse";

export default function Home(props) {
  return (
    <div className="Home">
      <Earth pic={props.pic} date={props.date} />
      <Verse />
    </div>
  );
}
