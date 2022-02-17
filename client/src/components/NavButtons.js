import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books, chapters } from "./data";

export default function NavButtons() {
  const [passage, setPassage] = useState(null);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [totalCh, setTotalCh] = useState(null);
  const [last, setLast] = useState(null);
  const [next, setNext] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let pass = params.passage;
    if (!pass.match(/[0-9]/g)) {
      pass = pass + " 1";
    }
    setPassage(pass);
  }, [params]);

  useEffect(() => {
    if (passage) {
      let bk;
      let ch;
      if (passage.split(" ")[0].match(/[0-9]/g)) {
        bk = passage.split(" ");
        ch = bk[2];
        bk = bk[0] + " " + bk[1];
      } else {
        bk = passage.split(" ")[0].toLowerCase();
        ch = passage.split(" ")[1];
      }
      if (ch && ch.includes(":")) {
        ch = ch.split(":")[0];
      } else if (!ch) {
        ch = 1;
      }
      setBook(bk);
      setChapter(ch);
    }
  }, [passage]);

  useEffect(() => {
    if (book) {
      let bks = books.map((book) => book.toLowerCase());
      let i = bks.indexOf(book);
      let totch = chapters[i];
      setTotalCh(totch);
    }
  }, [book]);

  // next
  useEffect(() => {
    // acct for: 1ch bks, rev, gen, final chap
    if (chapter && book && books && totalCh) {
      let nxt;
      let ch = parseInt(chapter);
      let tot = parseInt(totalCh);
      let bks = books.map((bk) => bk.toLowerCase());
      if (bks.indexOf(book.toLowerCase()) === bks.length - 1 && ch === tot) {
        nxt = bks[0];
      } else if (tot === 1) {
        nxt = bks[bks.indexOf(book) + 1];
      } else if (ch < tot) {
        nxt = `${book} ${parseInt(chapter) + 1}`;
      } else if (ch === tot) {
        nxt = bks[bks.indexOf(book) + 1];
      }
      setNext(nxt);
    }
  }, [totalCh, chapter, book]);

  //
  useEffect(() => {
    // need: last bk + last bk total ch
    if (chapter && books && book) {
      let lst;
      let bks = books.map((bk) => bk.toLowerCase());
      let ch = parseInt(chapter);
      if (ch > 1) {
        console.log("if");
        lst = `${book} ${ch - 1}`;
      } else if (bks.indexOf(book.toLowerCase()) > 0) {
        console.log("else if");
        let n = bks.indexOf(book.toLowerCase()) - 1;
        lst = bks[n];
        lst = chapters[n] > 1 ? lst + " " + chapters[n] : lst;
      } else {
        console.log("else");
        lst = bks[bks.length - 1] + " " + chapters[chapters.length - 1];
      }
      console.log(lst);
      setLast(lst);
    }
  }, [chapter, book]);

  return (
    <div className="NavButtons">
      <button onClick={() => navigate(`/bible/${last.toLowerCase()}`)}>
        {last}
      </button>
      <button onClick={() => navigate(`/bible/${next.toLowerCase()}`)}>
        {next}
      </button>
    </div>
  );
}
