import { useEffect, useState } from "react";
import { Books } from "./BibleBooks";
import { useNavigate } from "react-router-dom";

export default function BibleMenu(props) {
  const [show, setShow] = useState(window.innerWidth < 768 ? false : true);
  const [hide, setHide] = useState(false);
  // CONTROLS -------------------------------------
  const [searchValue, setSearchValue] = useState("");
  const [bookValue, setBookValue] = useState("");

  useEffect(() => {
    //INITIAL SETTING TO AVOID BLANK
    setBookValue("Genesis");
  }, []);

  let navigate = useNavigate();

  function query(e) {
    e.preventDefault();
    const type = e.target.className;
    //NAV TO URL / PROCESSED IN BIBLEVIEW.JS
    navigate(
      `/bible/${
        type === "book" ? bookValue.toLowerCase() : searchValue.toLowerCase()
      }`,
      {
        replace: true,
      }
    );
  }

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
            show <span className="First">menu</span>
          </span>
        )}
      </button>
      <form
        onSubmit={(e) => {
          query(e);
          setShow(false);
        }}
        className="user-passage"
      >
        <p>Lookup passage...</p>
        <input
          type="text"
          className="search-input"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button type="submit" className="bible-submit">
          go
        </button>
      </form>
      <form
        onSubmit={(e) => {
          query(e);
          setShow(false);
        }}
        className="book"
      >
        <p>...or select!</p>
        <select
          onChange={(e) => setBookValue(e.target.value)}
          value={bookValue}
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
