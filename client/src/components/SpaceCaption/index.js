import Interweave from "interweave";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";

export default function SpaceCaption(props) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  return (
    <div className="caption-container">
      <div className={show ? "SpaceCaption" : "SpaceCaption hide-caption"}>
        <div>
          <div
            className={
              show && window.innerWidth < 768 ? "right" : "caption-buttons"
            }
          >
            <button
              className="get-space-pic"
              onClick={() => navigate("/space")}
            >
              next pic &rarr;
            </button>
            <button className="get-space-pic" onClick={() => setShow(!show)}>
              {show ? "hide caption" : "show caption"}
            </button>
          </div>
          <h3>{props.title}</h3>
          <div className="desc-div">
            {props.title !== props.desc ? (
              <Interweave content={props.desc} />
            ) : null}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(`%cSEARCH`, "color: aqua", input);
            let inp = input.replace(" ", "%20");
            navigate(`/space/${inp}`);
          }}
        >
          <label htmlFor="search">
            Search topic: <span className="caution">*experimental</span>
          </label>
          <fieldset>
            <input
              type="text"
              id="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">go</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
