import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Kanban from "./Kanban";
import Lists from "./Lists";
import LayoutHeader from "./LayoutHeader";

export default function Board() {
  // create list from url once and pass down
  const [list, setList] = useState([]);

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // stamp (Date.now()), silo (n), title (string), text ([strings]), priority (bool), complete (bool)
  // stamp-silo-title-text-star-done_

  // ?silos=silo1_silo2_silo3&tasks=23423423423-silo1-title-text-1-0

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
    function sp() {
      let t = searchParams.get("tasks");
      let s = searchParams.get("silos");
      return [t, s];
    }
    function spLocal() {
      let t = localStorage.getItem("tasks");
      let s = localStorage.getItem("silos");
      return [t, s];
    }
    //
    let [t, s] = sp();
    if (!t && !s) {
      [t, s] = spLocal();
      let q = qstr(t, s);
      if (q) {
        setSearchParams(q);
      }
    }
  }, [setSearchParams, searchParams]);

  useEffect(() => {
    function sp() {
      let t = searchParams.get("tasks");
      let s = searchParams.get("silos");
      return [t, s];
    }
    let [t, s] = sp(); //tasks and silos
    if (t) {
      localStorage.setItem("tasks", t);
      t = t.split("_").filter((item) => item.match(/[a-zA-Z0-9]/g));
      let arr = [];
      t.forEach((task) => {
        t = task.split("~");
        let ob = {
          id: parseInt(t[0]),
          silo: t[1],
          title: t[2],
          text: t[3] === "null" ? null : t[3],
          star: parseInt(t[4]),
          done: parseInt(t[5]),
        };
        arr.push(ob);
      });
      setList(arr);
    } else {
      localStorage.removeItem("tasks");
      setList([]);
    }

    if (s) {
      localStorage.setItem("silos", s);
    } else {
      localStorage.removeItem("silos");
    }
  }, [searchParams]);

  return (
    <div className="Board">
      <LayoutHeader title={params.layout} />
      {params.layout === "kanban" ? (
        <Kanban list={list} />
      ) : (
        <Lists list={list} />
      )}
    </div>
  );
}
