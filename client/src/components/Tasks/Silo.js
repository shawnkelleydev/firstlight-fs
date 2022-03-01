import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import Submit from "./Submit";

export default function Silo(props) {
  const [silo, setSilo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const [warn, setWarn] = useState(false);

  const [over, setOver] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => setSilo(props.silo), [props]);
  useEffect(() => setInput(silo), [silo]);

  function ed(e) {
    e.preventDefault();
    const regex = /[a-zA-Z0-9]/g;
    if (input.match(regex)) {
      let s = searchParams.get("silos");
      s = s.replace(silo, input);
      let t = searchParams.get("tasks");
      t = t ? t.replaceAll(silo, input) : null;
      s = t ? `tasks=${t}&silos=${s}` : `silos=${s}`;
      setSearchParams(s);
      setEdit(false);
      setWarn(false);
    } else {
      setWarn(true);
    }
  }

  function del() {
    let t = searchParams.get("tasks");
    let s = searchParams.get("silos");
    s = s.replace(`${silo}_`, "");
    let str =
      t && s
        ? `tasks=${t}&silos=${s}`
        : s
        ? `silos=${s}`
        : t
        ? `tasks=${t}`
        : null;
    setSearchParams(str);
  }

  function drop(e) {
    if (e.target.className.includes("card-container")) {
      e.preventDefault();
      let newSilo = e.target.id;
      let taskId = e.dataTransfer.getData("text");
      let t = searchParams.get("tasks");
      let s = searchParams.get("silos");
      t = t.split("_").filter((item) => item.match(/[a-zA-Z0-9]/g));
      let item = t.filter((it) => it.includes(taskId))[0];
      item = item.split("~");
      let oldSilo = item[1];
      item.splice(1, 1, newSilo);
      item = item.reduce((string, piece) => string + "~" + piece);
      t = t.map((item) =>
        item.includes(taskId) ? item.replace(oldSilo, newSilo) : item
      );
      t = t.reduce((string, piece) => string + "_" + piece);
      t += "_";
      let str = `tasks=${t}&silos=${s}`;
      setSearchParams(str);
      setOver(false);
    }
  }

  return (
    <div className="Silo">
      {!edit ? (
        <div className="silo-header">
          <h2 onClick={() => setEdit(true)}>{silo}</h2>
          {props.n > 1 ? <button onClick={() => del()}>x</button> : null}
        </div>
      ) : (
        <Submit
          cb={ed}
          input={input}
          setInput={setInput}
          warn={warn}
          label="silo"
        />
      )}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => drop(e)}
        className={
          over ? "card-container card-container-over" : "card-container"
        }
        id={silo}
      >
        {props.list
          ? props.list
              .filter((item) => item.silo === silo)
              .map((item, i) => <Card item={item} key={i} />)
          : null}
      </div>
    </div>
  );
}
