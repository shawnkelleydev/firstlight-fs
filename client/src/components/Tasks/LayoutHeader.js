import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LayoutMenu from "./LayoutMenu";
import Add from "./Add";

export default function LayoutHeader(props) {
  const [input, setInput] = useState("");
  const [warn, setWarn] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  function sp() {
    let t = searchParams.get("tasks");
    let s = searchParams.get("silos");
    return [t, s];
  }

  function qstr(t, s) {
    return t && s
      ? `tasks=${t}&silos=${s}`
      : s
      ? `silos=${s}`
      : t
      ? `tasks=${t}`
      : null;
  }

  function addTask(e) {
    e.preventDefault();
    const regex = /[a-zA-Z0-9]/g;
    if (input.match(regex) && !input.includes("~")) {
      let [t, s] = sp();
      s = s ? s : "backlog_";
      let x = s.split("_")[0];
      let str = `${Date.now()}~${x ? x : "backlog"}~${input}~null~0~0_`;
      t = t ? t + str : str;
      str = qstr(t, s);
      setSearchParams(str);
      setWarn(false);
      setInput("");
    } else {
      setWarn(true);
    }
  }

  return (
    <div className="LayoutHeader">
      <div>
        <LayoutMenu />
        <h1>{props.title}</h1>
      </div>
      <Add
        label="task"
        submit={addTask}
        input={input}
        setInput={setInput}
        warn={warn}
      />
    </div>
  );
}
