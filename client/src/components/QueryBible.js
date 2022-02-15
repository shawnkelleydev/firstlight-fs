import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { books } from "./data";

export default function QueryBible() {
  const [input, setInput] = useState("");

  const [select, setSelect] = useState("Genesis");

  const navigate = useNavigate();
  return (
    <div className="QueryBible">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/bible/${input}`);
        }}
      >
        <fieldset>
          <label htmlFor="searchBox">
            <span>Look up a passage</span>
          </label>
          <input
            type="text"
            id="searchBox"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit">go</button>
        </fieldset>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/bible/${select}`);
        }}
      >
        <fieldset>
          <select onChange={(e) => setSelect(e.target.value)} value={select}>
            {books.map((book, i) => (
              <option value={book.toLowerCase()} key={i}>
                {book}
              </option>
            ))}
          </select>
          <button type="submit">go</button>
        </fieldset>
      </form>
    </div>
  );
}
