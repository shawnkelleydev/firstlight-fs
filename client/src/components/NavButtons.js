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
      } else if (passage.includes("song")) {
        bk = passage.split(" ");
        ch = bk.filter((x) => x.match(/[0-9]/))[0];
        if (ch.includes(":")) {
          ch = ch.split(":")[0];
        }
        bk = bk
          .filter((x) => x.match(/[A-Za-z]/g))
          .reduce((acc, word) => acc + " " + word);
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
      let bks = books.map((bk) => bk.toLowerCase());
      let bk = book.toLowerCase().includes("psalm") ? "psalm" : book;
      let i = bks.indexOf(bk);
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
      let bk = book;
      bk = bk.toLowerCase().includes("psalm") ? "psalm" : bk;
      if (bks.indexOf(bk.toLowerCase()) === bks.length - 1 && ch === tot) {
        nxt = bks[0];
      } else if (tot === 1) {
        nxt = bks[bks.indexOf(bk) + 1];
      } else if (ch < tot) {
        nxt = `${bk} ${parseInt(chapter) + 1}`;
      } else if (ch === tot) {
        nxt = bks[bks.indexOf(bk) + 1];
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
        lst = `${book} ${ch - 1}`;
      } else if (bks.indexOf(book.toLowerCase()) > 0) {
        let n = bks.indexOf(book.toLowerCase()) - 1;
        lst = bks[n];
        lst = chapters[n] > 1 ? lst + " " + chapters[n] : lst;
      } else {
        lst = bks[bks.length - 1] + " " + chapters[chapters.length - 1];
      }
      setLast(lst);
    }
  }, [chapter, book]);

  return last && next ? (
    <div className="NavButtons">
      <button onClick={() => navigate(`/bible/${last.toLowerCase()}`)}>
        &larr;
      </button>
      <button onClick={() => navigate(`/bible/${next.toLowerCase()}`)}>
        &rarr;
      </button>
    </div>
  ) : null;
}
