import { useState, useEffect } from "react";
import { verses } from "./Verses";
import Interweave from "interweave";
import { useNavigate } from "react-router-dom";
const esvKey = process.env.REACT_APP_ESVAPI;

export default function Verse() {
  const [verse, setVerse] = useState(null);
  const [citation, setCitation] = useState(null);
  const [chapter, setChapter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!citation) {
      let n = Math.floor(Math.random() * verses.length);
      let v = verses[n];
      setCitation(v);
    }
  }, [citation]);

  useEffect(() => {
    if (citation) {
      let c = citation;
      let url = `https://api.esv.org/v3/passage/html/?q=${c}`;
      let Authorization = `Token ${esvKey}`;
      fetch(url, { headers: { Authorization } })
        .then((res) => res.json())
        .then((d) => {
          setChapter(d.passage_meta[0].canonical.split(":")[0]);
          setVerse(d.passages[0]);
        })
        .catch((err) => console.error("esv error: ", err));
    }
  }, [citation]);

  return (
    <div className="Verse">
      <button
        onClick={() => {
          setCitation(null);
        }}
      >
        next verse &rarr;
      </button>
      {verse ? <Interweave content={verse} /> : null}
      <button onClick={() => navigate(`/bible/${chapter.toLowerCase()}`)}>
        read {chapter} &rarr;
      </button>
    </div>
  );
}
