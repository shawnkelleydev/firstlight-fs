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
      //corection for psalm / psalms (important for methods below)
      bk = bk === "Psalm" ? "Psalms" : bk;

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
      let bk = book;
      //corrections for weird presentations of psalms / proverbs
      bk = bk === "Psalm" ? "Psalms" : bk === "Proverb" ? "Proverbs" : bk;
      let n = Books.indexOf(bk);
      let prev;
      let next;

      prev = n > 0 ? Books[n - 1] : null;
      next = n < 65 ? Books[n + 1] : null;
      console.log(prev, next);
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
      if (nextBook || book.toLowerCase() === "revelation") {
        if (totalChapters === 1) {
          destination = nextBook;
        } else if (chapter < totalChapters) {
          destination = `${book}%20${chapter + 1}`;
        } else {
          destination = nextBook;
        }
      }
    } else {
      //last ch handler
      if (prevBook || book.toLowerCase() === "genesis") {
        if (totalChapters === 1) {
          destination =
            prevBookChapters === 1
              ? prevBook.toLowerCase()
              : prevBook.toLowerCase() + "%20" + prevBookChapters;
        } else if (chapter > 1) {
          destination = `${book}%20${chapter - 1}`;
        } else {
          destination = `${prevBook.toLowerCase()}${
            prevBookChapters > 1 ? "%20" + prevBookChapters : "" //accounts for books with 1 chapter
          }`;
        }
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
        {book && book === "Psalms" && chapter > 1
          ? `Psalm ${chapter - 1}`
          : book && book.toLowerCase() === "genesis" && chapter === 1
          ? "Revelation 22"
          : totalChapters === 1
          ? `${prevBook} ${prevBookChapters}`
          : chapter === 1
          ? `${prevBook === "Psalms" ? "Psalm" : prevBook} ${prevBookChapters}`
          : `${book} ${chapter - 1}`}
      </button>
      <button
        onClick={() => handleNavigation(true)} //isNext
        className={"next"}
      >
        {!book || !chapter
          ? ""
          : book && book === "Psalms" && chapter < 150
          ? `Psalm ${chapter + 1}`
          : book && book.toLowerCase() === "revelation" && chapter === 22
          ? "Genesis 1"
          : totalChapters === 1
          ? `${nextBook} 1`
          : chapter < totalChapters
          ? `${book} ${chapter + 1}`
          : `${nextBook === "Psalms" ? "Psalm" : nextBook} 1`}{" "}
        &rarr;
      </button>
    </div>
  );
}
