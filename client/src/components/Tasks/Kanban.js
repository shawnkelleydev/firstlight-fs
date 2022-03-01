import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Silo from "./Silo";
import Submit from "./Submit";

export default function Kanban(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [input, setInput] = useState("");
  const [silos, setSilos] = useState([]);
  const [warn, setWarn] = useState(false);

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
      let s = searchParams.get("silos");
      let t = searchParams.get("tasks");
      s = s ? s + input + "_" : input + "_";
      let str = t && s ? `tasks=${t}&silos=${s}` : `silos=${s}`;
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
