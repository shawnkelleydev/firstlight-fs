import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Interweave from "interweave";
import QueryBible from "./QueryBible";
import NavButtons from "./NavButtons";

const esvKey = process.env.REACT_APP_ESVAPI;

export default function Reader() {
  const params = useParams();
  // query
  const [query, setQuery] = useState(null);
  // html
  const [text, setText] = useState(null);

  useEffect(() => {
    if (params.passage) {
      let c = params.passage;
      setQuery(c);
    }
  }, [params]);

  useEffect(() => {
    if (query) {
      let q = query;
      q = q.replace(" ", "%20");
      let url = `https://api.esv.org/v3/passage/html/?q=${q}`;
      let Authorization = `Token ${esvKey}`;
      fetch(url, { headers: { Authorization } })
        .then((res) => res.json())
        .then((d) => {
          setText(d.passages[0]);
        })
        .catch((err) => console.error("esv error: ", err));
    }
  }, [query]);

  return (
    <div className="Reader">
      <div className="text-container">
        <NavButtons />
        <Interweave content={text} />
        <NavButtons />
      </div>
      <QueryBible />
    </div>
  );
}
