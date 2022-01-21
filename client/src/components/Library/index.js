import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (input !== "") {
      setWarning(false);
    }
  }, [input]);

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
          <div>
            {input.length > 3 ? (
              <a
                className="external-search"
                target="_blank"
                rel="noreferrer"
                href={`https://www.monergism.com/search?keywords=${input}&format=59`}
              >
                search {input} on monergism.com &#187;
              </a>
            ) : null}
            {input.toLowerCase().includes("edwards") ? (
              <a
                className="external-search"
                target="_blank"
                rel="noreferrer"
                href="http://edwards.yale.edu"
              >
                Visit the Jonathan Edwards center &#187;
              </a>
            ) : null}
          </div>
          <p className={warning ? "warning" : "hide"}>Please provide input.</p>
        </form>
        <Outlet />
      </div>
    </div>
  );
}
