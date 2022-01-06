import { useEffect, useState } from "react";
import { Books, Chapters } from "./BibleBooks";
import { useNavigate } from "react-router-dom";

export default function BibleNavButtons(props) {
  // INCOMING PROPS: citation, chapv, book, switchChapter()

  // STATE --------------------------------------------------

  // BOOK (FOR NAVIGATION)
  const [book, setBook] = useState(null);

  // CHAPTER (FOR NAVIGATION)
  const [chapter, setChapter] = useState(null);
  const [totalChapters, setTotalChapters] = useState(null);

  // NEXT / PREVIOUS BOOK CITATIONS --------------------------

  const [prevBook, setPrevBook] = useState(null);
  const [prevBookChapters, setPrevBookChapters] = useState(null);
  const [nextBook, setNextBook] = useState(null);

  // NAVIGATION
  let navigate = useNavigate();

  // EFFECTS ------------------------------------------------

  //get chapter for use with navigation
  useEffect(() => {
    // PROPS
    let chap = props.canonical;
    // CONDITION TO AVOID ASYNC ERRORS
    if (chap) {
      // GET CHAPTER
      chap = chap.includes(":") ? chap.split(":")[0] : chap;
      // GET NUMBERS
      let regex = /[0-9]+/g;
      chap = !chap.match(regex) ? 1 : chap.match(regex);
      if (typeof chap !== "number") {
        chap = chap[chap.length - 1];
        chap = parseInt(chap);
      }
      setChapter(chap);

      // GET BOOK
      let bk = props.canonical;
      //bk number if applicable
      let n = parseInt(bk.split(" ")[0]);
      //get words
      regex = /[A-Za-z]+/g;
      bk = bk.match(regex);
      bk = bk.reduce((acc, val) => acc + " " + val);
      //add back n if applicable
      bk = n ? n + " " + bk : bk;
      setBook(bk);

      // GET TOTAL CHAPTERS
      n = Books.indexOf(bk); //use Books b/c capitalized
      n = Chapters[n];
      setTotalChapters(n);
    }
  }, [props.canonical]);

  // PREV / NEXT BOOKS
  useEffect(() => {
    if (book && Books) {
      let n = Books.indexOf(book);
      let prev;
      let next;
      prev = n > 0 ? Books[n - 1] : null;
      next = n < 65 ? Books[n + 1] : null;
      //seems to be reverting to "null, genesis" between renders...weird
      setPrevBook(prev);
      setNextBook(next);
    }
  }, [book]);

  // PREV BOOK TOTAL CHAPTERS
  useEffect(() => {
    if (prevBook) {
      let total = Books.indexOf(prevBook);
      total = Chapters[total];
      setPrevBookChapters(total);
    }
  }, [prevBook]);

  // NAVIGATION HANDLER
  function handleNavigation(isNext) {
    let destination;
    if (isNext) {
      //next ch handler
      if (nextBook) {
        if (chapter < totalChapters) {
          destination = `${book}%20${chapter + 1}`;
        } else {
          destination = `${nextBook.toLowerCase()}`; //will properly render 1-chapter books
        }
      } else {
        destination = "genesis%201";
      }
    } else {
      //last ch handler
      if (prevBook) {
        if (chapter > 1) {
          destination = `${book}%20${chapter - 1}`;
        } else {
          destination = `${prevBook.toLowerCase()}${
            prevBookChapters > 1 ? "%20" + prevBookChapters : "" //accounts for books with 1 chapter
          }`;
        }
      } else {
        destination = "revelation%2022";
      }
    }
    navigate(`/bible/${destination}`, { replace: true });
  }

  // RENDER -------------------------------------------------------

  return (
    <div
      className={props.noResults ? "hide-bible-nav-buttons" : "BibleNavButtons"}
    >
      <button
        onClick={() => handleNavigation(false)} //!isNext
        className={"last"}
      >
        &larr;{" "}
        {book && book.toLowerCase() === "genesis" && chapter === 1
          ? "Revelation 22"
          : chapter === 1
          ? `${prevBook} ${prevBookChapters}`
          : `${book} ${chapter - 1}`}
      </button>
      <button
        onClick={() => handleNavigation(true)} //isNext
        className={"next"}
      >
        {!book || !chapter
          ? ""
          : book.toLowerCase() === "revelation" && chapter === 22
          ? "Genesis 1"
          : chapter < totalChapters
          ? `${book} ${chapter + 1}`
          : `${nextBook} 1`}{" "}
        &rarr;
      </button>
    </div>
  );
}
