import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Star from "./Star";
import Submit from "./Submit";

export default function Card(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [warn, setWarn] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(props.item.title);

  function sp() {
    let t = searchParams.get("tasks");
    let s = searchParams.get("silos");
    return [t, s];
  }

  function del() {
    let item = props.item;
    let id = item.id.toString();
    let t = searchParams.get("tasks");
    let s = searchParams.get("silos");
    t = t
      .split("_")
      .filter((item) => !item.includes(id) && item.match(/[a-zA-Z0-9]/g));

    t = t.length > 0 ? t.reduce((string, item) => string + "_" + item) : null;
    t += t ? "_" : null;
    let str = t ? `tasks=${t}&silos=${s}` : `silos=${s}`;
    setSearchParams(str);
  }

  function edTitle(e) {
    e.preventDefault();
    if (titleInput.match(/[a-zA-Z0-9]/g)) {
      setEditTitle(false);
      let [t, s] = sp();
      let orig = props.item.title;
      let newTitle = titleInput;
      t = t.replaceAll(orig, newTitle);
      let str = `tasks=${t}&silos=${s}`;
      setSearchParams(str);
      setWarn(false);
    } else {
      setWarn(true);
    }
  }

  function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  return (
    <div
      className="Card"
      draggable="true"
      id={props.item.id}
      onDragStart={(e) => drag(e)}
    >
      <div>
        <span>
          <Star item={props.item} />
          {editTitle ? (
            <Submit
              cb={edTitle}
              input={titleInput}
              setInput={setTitleInput}
              warn={warn}
            />
          ) : (
            <h3 onClick={() => setEditTitle(true)}>{props.item.title}</h3>
          )}
        </span>
        <button onClick={() => del()}>x</button>
      </div>
    </div>
  );
}
