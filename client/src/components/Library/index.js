import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./styles.css";

export default function Library(props) {
  const [input, setInput] = useState("");
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (input !== "") {
      navigate(`/library/search?q=${input}`);
      setWarning(false);
    } else {
      setWarning(true);
    }
  }

  return (
    <div className="Library">
      <div
        className="APOD-div"
        style={{
          backgroundImage: props.APOD ? `url(${props.APOD.url})` : null,
        }}
      >
        <form onSubmit={(e) => handleSearch(e)}>
          <label htmlFor="search">search for resources</label>
          <fieldset>
            <input
              type="text"
              id="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">go</button>
          </fieldset>
          <p className={warning ? "warning" : "hide"}>Please provide input.</p>
        </form>
        <Outlet />
      </div>
    </div>
  );
}
