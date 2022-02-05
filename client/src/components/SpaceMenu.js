import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpaceMenu(props) {
  const [hide, setHide] = useState(true);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  return (
    <div className={!hide ? "SpaceMenu" : "SpaceMenu SpaceMenu-hide"}>
      <div>
        <button onClick={() => navigate("/space")}>next pic &rarr;</button>
        <button onClick={() => setHide(!hide)}>
          {!hide ? "hide menu" : "show menu"}
        </button>
      </div>
      <div>
        <h2>{props.title}</h2>
        {props.desc}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/space/${input}`);
        }}
      >
        <input
          type="text"
          placeholder="search NASA"
          aria-label="search NASA"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>go</button>
      </form>
    </div>
  );
}
