//dependencies
import Interweave from "interweave";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

//component
export default function VOD(props) {
  const [show, setShow] = useState(false);
  const [VOD, setVOD] = useState(null);
  const [citation, setCitation] = useState(null);
  const [query, setQuery] = useState(null);
  const [chapter, setChapter] = useState(null);
  const esv = process.env.REACT_APP_ESVAPI;
  const params = useParams();

  //syncs display of new citation with new verse load
  useEffect(() => {
    setQuery(params.verse);
  }, [params]);

  useEffect(() => {
    if (query) {
      let url = `https://api.esv.org/v3/passage/html/?q=${query}`;
      let Authorization = esv;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCitation(data.canonical);
          let chap = data.canonical.split(":")[0];
          setChapter(chap);
          let pass = data.passages[0];
          setVOD(pass);
        });
    }
  }, [query, esv]);

  useEffect(() => {
    if (VOD) {
      function fire() {
        setShow(true);
      }
      //allows user to see animation on first load
      setTimeout(fire, 100);
    }
  }, [VOD]);

  return (
    <div className={show ? "VOD show-in-place" : "VOD conceal-below"}>
      {VOD ? (
        <>
          <button
            className="get-verse"
            onClick={() => {
              props.getVerse();
            }}
          >
            get another verse &#187;
          </button>
          <Interweave content={VOD} />
          <span className="vod-cit">{citation} ESV</span>
          <Link to={`/bible/${chapter}`} className="get-verse">
            read {chapter} &#187;
          </Link>
        </>
      ) : null}
    </div>
  );
}