import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Silo from "./Silo";
import Add from "./Add";

export default function Kanban(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState("");
  const [silos, setSilos] = useState([]);
  const [warn, setWarn] = useState(false);

  // get search params
  function sp() {
    let t = searchParams.get("tasks");
    let s = searchParams.get("silos");
    return [t, s];
  }

  // build query string
  function qstr(t, s) {
    return t && s
      ? `tasks=${t}&silos=${s}`
      : s
      ? `silos=${s}`
      : t
      ? `tasks=${t}`
      : null;
  }

  useEffect(() => {
    let s = searchParams.get("silos");
    if (s) {
      s = s.split("_").filter((item) => item.match(/[a-zA-Z0-9]/g));
      setSilos(s);
    } else {
      setSilos([]);
    }
  }, [searchParams]);

  function addSilo(e) {
    e.preventDefault();
    if (input.match(/[a-zA-Z0-9]/g)) {
      let [t, s] = sp();
      s = s ? s + input + "_" : input + "_";
      let str = qstr(t, s);
      setSearchParams(str);
      setWarn(false);
      setInput("");
    } else {
      setWarn(true);
    }
  }

  const [add, setAdd] = useState(false);

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
    <div className="Kanban">
      {silos.map((silo, i) => (
        <Silo key={i} n={i + 1} silo={silo} list={props.list} />
      ))}
      <Add
        toggle={toggleBtn}
        add={add}
        label="silo"
        submit={addSilo}
        input={input}
        setInput={setInput}
        warn={warn}
        class={showSubmit ? "Submit-in" : null}
        buttonRight={true}
        showSubmit={showSubmit}
      />
      {/* <div className="add-silo-container">
        <AddBtn add={add} cb={() => setAdd(!add)} />
        {add ? (
          <Submit
            cb={addSilo}
            input={input}
            setInput={setInput}
            warn={warn}
            label="silo name"
          />
        ) : null}
      </div> */}
    </div>
  );
}
