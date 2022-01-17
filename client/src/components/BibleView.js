import { useState, useEffect } from "react";
import Interweave from "interweave";
import { useParams } from "react-router-dom";

//children
import BibleNotes from "./BibleNotes";
import BibleNavButtons from "./BibleNavButtons";

export default function BibleView(props) {
  // USER QUERY FROM URL
  const [query, setQuery] = useState(null);
  // RESPONSE FROM ESV API
  const [canonical, setCanonical] = useState(null);
  const [passage, setPassage] = useState(null);
  // NO RESULTS
  const [noResults, setNoResults] = useState(false);

  const params = useParams();
  const esv = process.env.REACT_APP_ESVAPI;

  // GET QUERY
  useEffect(() => {
    setQuery(params.query);
  }, [params]);

  // MAKE CALL / SET CANANICAL REFERENCE AND PASSAGE
  useEffect(() => {
    if (query) {
      let url = "https://api.esv.org/v3/passage/html/?q=";
      let Authorization = esv;
      url += query;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCanonical(data.canonical);
          let pass = data.passages[0];
          if (!pass) {
            setPassage(null);
            setNoResults(true);
          } else {
            setPassage(pass);
            setNoResults(false);
          }
        });
    }
  }, [query, esv]);

  return (
    <div
      className="BibleView"
      style={{ backgroundImage: props.APOD ? `url(${props.APOD.url})` : null }}
    >
      <div className="reading-parent">
        <div className="reading-div">
          {passage ? (
            <BibleNavButtons canonical={canonical} noResults={noResults} />
          ) : null}
          {noResults ? (
            <span className="no-reults">
              <h1>No results!</h1>
              <h2>Please try again.</h2>
            </span>
          ) : (
            <Interweave content={passage ? passage : "<h1>loading...</h1>"} />
          )}
          {passage ? (
            <BibleNavButtons canonical={canonical} noResults={noResults} />
          ) : null}
        </div>
        <div className="user-stuff-container">
          <BibleNotes canonical={canonical} noResults={noResults} />
        </div>
      </div>
    </div>
  );
}
