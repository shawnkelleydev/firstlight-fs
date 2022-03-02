import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Silo from "./Silo";
import Submit from "./Submit";

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

  return (
    <div className="Kanban">
      {silos.map((silo, i) => (
        <Silo key={i} n={i + 1} silo={silo} list={props.list} />
      ))}
      <Submit
        cb={addSilo}
        input={input}
        setInput={setInput}
        warn={warn}
        label="silo name"
      />
    </div>
  );
}
