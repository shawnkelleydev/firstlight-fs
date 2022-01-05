//dep
import { Outlet } from "react-router-dom";

//children
import BibleMenu from "./BibleMenu";

export default function Bible(props) {
  return (
    <div className="Bible">
      <Outlet />
      <BibleMenu isHam={props.isHam} />
    </div>
  );
}
