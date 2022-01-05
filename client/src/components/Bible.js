//dep
import { Outlet } from "react-router-dom";

//children
import BibleMenu from "./BibleMenu";

export default function Bible(props) {
  return (
    <div className="Bible">
      <Outlet />
      <BibleMenu
        query={props.query}
        //--------------------
        searchValue={props.searchValue}
        bookValue={props.bookValue}
        //--------------------
        setSearchValue={props.setSearchValue}
        setBookValue={props.setBookValue}
        //--------------------
        isHam={props.isHam}
      />
    </div>
  );
}
