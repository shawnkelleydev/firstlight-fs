import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpaceQuery() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className="SpaceQuery"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/space/${input}`);
      }}
    >
      <fieldset>
        <input
          type="text"
          placeholder="search NASA"
          aria-label="search NASA"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>go</button>
      </fieldset>
    </form>
  );
}
