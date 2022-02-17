import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import SpaceQuery from "./SpaceQuery";

export default function SpaceMenu(props) {
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  return (
    <div className={!hide ? "SpaceMenu" : "SpaceMenu SpaceMenu-hide"}>
      <div className="button-container">
        <button onClick={() => navigate("/space")}>next pic &rarr;</button>
        <button onClick={() => setHide(!hide)}>
          {!hide ? "hide caption" : "show caption"}
        </button>
      </div>
      <div className="desc-container">
        <h2>{props.title}</h2>
        <ReactMarkdown children={props.desc} />
      </div>
      <SpaceQuery />
    </div>
  );
}
