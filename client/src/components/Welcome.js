import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Welcome() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  return (
    <div className="Welcome">
      <h1>Welcome to the Bible!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/bible/${input}`);
        }}
      >
        <fieldset>
          <label htmlFor="searchBox">
            <span>Look up a passage</span>
          </label>
          <input
            type="text"
            id="searchBox"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit">go</button>
        </fieldset>
      </form>
    </div>
  );
}
