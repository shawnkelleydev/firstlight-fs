import { useEffect, useState } from "react";
import { Books, Chapters } from "./BibleBooks";

export default function BibleNavButtons(props) {
  // INCOMING PROPS: citation, chapv, book, switchChapter(), setErrorState()
  //array of Bible books in lower case
  const books = Books.map((book) => book.toLowerCase());

  // STATE --------------------------------------------------

  //chapter
  const [chapter, setChapter] = useState(null);
  const [totalChapters, setTotalChapters] = useState(null);

  //NEXT / PREVIOUS BOOK CITATIONS --------------------------

  const [prevBook, setPrevBook] = useState(null);
  const [prevBookChapters, setPrevBookChapters] = useState(null);
  const [nextBook, setNextBook] = useState(null);

  // EFFECTS ------------------------------------------------

  //get chapter from chapv for use with navigation
  useEffect(() => {
    let chap = props.chapv;

    // SET BOOK && SET TOTAL CHAPTERS
    if (props.book) {
      let n = books.indexOf(props.book);
      n = Chapters[n];
      setTotalChapters(n);
    }

    // SET CHAPTER
    if (chap === "" || !chap) {
      setChapter(1);
    } else if (chap) {
      chap = chap.toString();
      chap = chap.includes(":") ? chap.split(":")[0] : chap;
      chap = parseInt(chap);
      //CHECK FOR ERRONEROUS CHAPTERS
      let n = books.indexOf(props.book);
      n = Chapters[n];
      // SET N IF USER TYPES MASSIVE CHAPTER NUMBER
      setChapter(chap > n ? n : chap);
    }
  }, [props.chapv, props.book, books]);

  //find previous and next books, save in state
  useEffect(() => {
    if (props.book && books) {
      let n = books.indexOf(props.book);
      let prev;
      let next;
      prev = n > 0 ? books[n - 1] : null;
      next = n < 65 ? books[n + 1] : null;
      //seems to be reverting to "null, genesis" between renders...weird
      setPrevBook(prev);
      setNextBook(next);
    }
  }, [props.book, books]);

  // PREV BOOK TOTAL CHAPTERS
  useEffect(() => {
    if (prevBook) {
      let total = books.indexOf(prevBook);
      total = Chapters[total];
      setPrevBookChapters(total);
    }
  }, [prevBook, books]);

  // NAVIGATION HANDLER
  function handleNavigation(isNext) {
    let citation;
    if (isNext) {
      //next ch handler
      if (chapter < totalChapters) {
        citation = props.book + " " + (chapter + 1);
        props.setChapv(chapter + 1);
      } else {
        citation = nextBook + " " + 1;
        props.setBook(nextBook);
        props.setChapv("");
      }
    } else {
      //last ch handler
      if (chapter > 1) {
        citation = props.book + " " + (chapter - 1);
        props.setChapv(chapter - 1);
      } else {
        citation = prevBook + " " + prevBookChapters;
        props.setBook(prevBook);
        props.setChapv(prevBookChapters);
      }
    }
    props.switchChapter(citation);
  }

  // RENDER -------------------------------------------------------

  return (
    <div className="BibleNavButtons">
      <button
        onClick={() => handleNavigation(false)} //!isNext
        className={chapter <= 1 && !prevBook ? "hide-last" : "last"}
      >
        &larr;{" "}
        {chapter === 1
          ? `${prevBook} ${prevBookChapters}`
          : `${props.book} ${chapter - 1}`}
      </button>
      <button
        onClick={() => handleNavigation(true)} //isNext
        className={chapter >= totalChapters && !nextBook ? "hide-next" : "next"}
      >
        {chapter < totalChapters
          ? `${props.book} ${chapter + 1}`
          : `${nextBook} 1`}{" "}
        &rarr;
      </button>
    </div>
  );
}
