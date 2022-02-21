import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books, chapters } from "./data"; // chapters = array of # of chapters for each book (number type)

export default function NavButtons() {
  // state
  const [passage, setPassage] = useState(null);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [totalCh, setTotalCh] = useState(null);
  const [last, setLast] = useState(null);
  const [next, setNext] = useState(null);

  // lower case books for comparison below
  const booksTLC = useMemo(() => {
    return books.map((book) => book.toLowerCase());
  }, []);

  // react router
  const params = useParams();
  const navigate = useNavigate();

  // correction for no chapter provided by user
  useEffect(() => {
    let pass = params.passage;
    if (!pass.match(/[0-9]/g)) {
      pass = pass + " 1";
    }
    setPassage(pass);
  }, [params]);

  // book and chapter determinations
  useEffect(() => {
    if (passage) {
      let bk;
      let ch;
      //abstracted parsing

      let p = passage.toLowerCase();

      // book parsing
      bk = p.match(/[a-z]+/g);
      bk = bk.reduce((title, word) => title + " " + word);
      // handles book numbers
      bk = p.split(" ")[0].match(/[0-9]/) ? p.split(" ")[0] + " " + bk : bk;
      // looks for match
      bk = booksTLC.filter((book) => book.includes(bk))[0];
      setBook(bk);

      // chapter
      ch = p.split(/[a-z]+/g); //chops out text, leaves number strings
      ch = ch[ch.length - 1]; //final number string = ch:v
      ch = !parseInt(ch) ? "1" : ch; //parseInt later to filter out verses first
      ch = ch.includes(":") ? ch.split(":")[0] : ch; // filter out verse value, as not needed
      ch = parseInt(ch);
      setChapter(ch);
    }
  }, [passage, booksTLC]);

  // total chapter determination for comparison below
  useEffect(() => {
    if (book) {
      let totch;
      let i = booksTLC.indexOf(book);
      totch = chapters[i];
      setTotalCh(totch);
    }
  }, [book, booksTLC]);

  // next
  useEffect(() => {
    if (chapter && book && totalCh) {
      let nxt;
      // abstracted next code
      if (chapter === totalCh) {
        let i = booksTLC.indexOf(book);
        i += 1;
        i = i === booksTLC.length ? 0 : i;
        nxt = booksTLC[i];
      } else {
        nxt = chapter + 1;
        nxt = book + " " + nxt;
      }

      setNext(nxt);
    }
  }, [totalCh, chapter, book, booksTLC]);

  // last
  useEffect(() => {
    if (chapter && books && book) {
      let lst;
      // abstracted last code
      if (chapter === 1) {
        let i;
        i = booksTLC.indexOf(book);
        i -= 1;
        i = i === -1 ? booksTLC.length - 1 : i;
        lst = chapters[i] > 1 ? booksTLC[i] + " " + chapters[i] : booksTLC[i];
      } else {
        lst = chapter - 1;
        lst = book + " " + lst;
      }
      setLast(lst);
    }
  }, [chapter, booksTLC, book]);

  return last && next ? (
    <div className="NavButtons">
      <button onClick={() => navigate(`/bible/${last.toLowerCase()}`)}>
        {last}
        <br />
        <span>&larr;</span>
      </button>
      <button onClick={() => navigate(`/bible/${next.toLowerCase()}`)}>
        {next}
        <br />
        <span>&rarr;</span>
      </button>
    </div>
  ) : null;
}
