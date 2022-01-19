import { useEffect, useState } from "react";
import "./styles.css";

import Aex from "../Aex";

export default function SearchResult(props) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    setBook(props.book);
  }, [props]);

  if (book) {
    return (
      <div className="SearchResult">
        {book.thumbnail ? (
          <a href={book.url} target="_blank" rel="noreferrer">
            <img
              src={book.thumbnail}
              className="thumbnail"
              alt={book.title + " thumbnail"}
            />
          </a>
        ) : null}
        <div>
          <a href={book.url} target="_blank" rel="noreferrer">
            <div>
              <h3 className="title capitalize">{book.title}</h3>
              {book.subtitle ? (
                <h5 className="subtitle capitalize">{book.subtitle}</h5>
              ) : null}
              {book.authors && book.authors.length > 0 ? (
                <h4 className="authors">
                  <span className="names">By {book.authors}</span>{" "}
                  {book.publishedDate ? (
                    <>
                      <span>( published {book.publishedDate} )</span>
                    </>
                  ) : null}
                </h4>
              ) : null}
            </div>
          </a>

          <p className="source">
            {<Aex href={book.url} text={book.source} />}{" "}
            {book.mobi ? (
              <>
                | <Aex href={book.mobi} text="mobi" />
              </>
            ) : null}{" "}
            {book.epub ? (
              <>
                | <Aex href={book.epub} text="epub" />
              </>
            ) : null}{" "}
            {book.pdf ? (
              <>
                | <Aex href={book.pdf} text="pdf" />
              </>
            ) : null}{" "}
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
