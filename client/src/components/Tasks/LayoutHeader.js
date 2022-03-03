import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LayoutMenu from "./LayoutMenu";
import Add from "./Add";

export default function LayoutHeader(props) {
  const [add, setAdd] = useState(false);
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

  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const ssTrue = () => {
      setShowSubmit(true);
    };
    if (add) {
      setTimeout(ssTrue, 100);
    } else {
      setShowSubmit(false);
    }
  }, [add]);

  function toggleBtn() {
    if (!add) {
      // activate effect above
      setAdd(true);
    } else {
      //hide form
      setShowSubmit(false);
      //poof form
      const addFalse = () => setAdd(false);
      setTimeout(addFalse, 100);
    }
  }

  return (
    <div className="LayoutHeader">
      <div>
        <LayoutMenu />
        <h1>{props.title}</h1>
      </div>
      <Add
        toggle={toggleBtn}
        add={add}
        label="task"
        submit={addTask}
        input={input}
        setInput={setInput}
        warn={warn}
        class={showSubmit ? "Submit-in" : null}
        showSubmit={showSubmit}
        buttonRight={true}
      />

      {/* <div className="add-task-container">
        {add ? (
          <Submit
            label="task"
            cb={addTask}
            input={input}
            setInput={setInput}
            warn={warn}
            class={showSubmit ? "Submit-in" : null}
          />
        ) : null}
        <h2 className={showSubmit ? "h2-hide" : null}>Add Task</h2>
        <toggleBtn cb={toggleBtn} add={add} />
      </div> */}
    </div>
  );
}
