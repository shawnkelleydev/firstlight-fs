import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles.css";
import SearchResult from "../SearchResult";

export default function LibrarySearchResults() {
  // RAW DATA
  const [searchParams] = useSearchParams();
  const [googleResults, setGoogleResults] = useState(null);
  const [gutenbergResults, setGutenbergResults] = useState(null);

  // PROCESSED
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState(null);

  // QUERY APIS
  useEffect(() => {
    let q = searchParams.get("q");
    let url;
    // GOOGLE BOOKS
    function queryGoogle(query) {
      url = `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=free-ebooks&maxResults=20`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setGoogleResults(data));
    }
    // GUTENDEX
    function queryGutenberg(query) {
      url = `http://gutendex.com/books?search=${query}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setGutenbergResults(data));
    }

    queryGoogle(q);
    queryGutenberg(q);
  }, [searchParams]);

  useEffect(() => {
    let arr = [];
    // HANDLE GOOGLE BOOKS RESULTS
    let r = googleResults;
    if (r) {
      let items = r.items;
      items.forEach((item) => {
        let info = item.volumeInfo;
        let title = info.title;
        let subtitle = info.subtitle;
        let authors = info.authors;
        let url = info.infoLink;
        let thumbnail = info.imageLinks.thumbnail;
        let publishedDate = info.publishedDate;
        let epub = item.accessInfo.epub.isAvailable
          ? item.accessInfo.epub.downloadLink
          : null;
        let pdf = item.accessInfo.pdf.isAvailable
          ? item.accessInfo.pdf.downloadLink
          : null;
        let source = "google books";
        let obj = {
          title,
          subtitle,
          authors,
          url,
          thumbnail,
          publishedDate,
          epub,
          pdf,
          source,
        };
        arr.push(obj);
      });
    }
    // HANDEL GUTENDEX RESULTS
    r = gutenbergResults;
    if (r) {
      r = r.results;
      r.forEach((result) => {
        let title = result.title;
        let authors = [];
        result.authors.forEach((author) => authors.push(author.name));
        let url = `https://www.gutenberg.org/ebooks/${result.id}`;
        let epub = result.formats["application/epub+zip"];
        let textHtml = result.formats["text/html"];
        let thumbnail = result.formats["image/jpeg"];
        let mobi = result.formats["application/x-mobipocket-ebook"];
        let html = result.formats["text/html"];
        let source = "project gutenberg";
        let obj = {
          title,
          authors,
          url,
          thumbnail,
          epub,
          textHtml,
          mobi,
          html,
          source,
        };
        arr.push(obj);
      });
    }
    setBooks(arr);
  }, [googleResults, gutenbergResults]);

  // sorting here to avoid glitchy rerenders
  useEffect(() => {
    if (books.length > 0) {
      let sorted = books.sort((a, b) => (a.title > b.title ? 1 : -1));
      setSortedBooks(sorted);
    }
  }, [books]);

  if (sortedBooks) {
    return (
      <div className="LibrarySearchResults">
        <h1>results</h1>
        {sortedBooks.map((book, i) => (
          <SearchResult book={book} key={i} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}
