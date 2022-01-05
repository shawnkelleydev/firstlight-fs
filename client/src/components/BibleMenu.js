import { useEffect, useState } from "react";
import { Books } from "./BibleBooks";

export default function BibleMenu(props) {
  const [show, setShow] = useState(window.innerWidth < 768 ? false : true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(props.isHam ? false : true);
  }, [props.isHam]);

  return (
    <div
      className={
        hide
          ? "BibleMenu hide-down"
          : show && props.isHam
          ? "BibleMenu"
          : props.isHam
          ? "hide-bible-menu BibleMenu"
          : "super-hide-bible-menu BibleMenu"
      }
    >
      <button className="toggle-bible-menu" onClick={() => setShow(!show)}>
        {show ? (
          <span>
            hide <span className="First">menu</span>
          </span>
        ) : (
          <span>
            search the <span className="First">Bible</span>
          </span>
        )}
      </button>
      <form
        onSubmit={(e) => {
          props.query(e);
          setShow(false);
        }}
        className="user-passage"
      >
        <p>Search...</p>
        <input
          type="text"
          className="search-input"
          value={props.searchValue}
          onChange={(e) => {
            props.setSearchValue(e.target.value);
          }}
        />
        <button type="submit" className="bible-submit">
          go
        </button>
      </form>
      <form
        onSubmit={(e) => {
          props.query(e);
          setShow(false);
        }}
        className="book"
      >
        <p>...or select!</p>
        <select
          onChange={(e) => props.setBookValue(e.target.value)}
          value={props.bookValue}
        >
          {Books.map((book, i) => (
            <option key={i} value={book}>
              {book}
            </option>
          ))}
        </select>
        <button type="submit" className="bible-submit">
          go
        </button>
      </form>
    </div>
  );
}
