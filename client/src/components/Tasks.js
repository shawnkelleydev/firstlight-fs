import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AddTask from "./AddTask";
import Task from "./Task";

export default function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [string, setString] = useState(null);

  useEffect(() => {
    let t = localStorage.getItem("tasks");
    let sp = searchParams.get("tasks");
    t = t === "null" ? null : t;
    if (sp) {
      setString(sp);
      localStorage.setItem("tasks", sp);
    } else if (t) {
      setSearchParams(`tasks=${t}`);
    }
  }, [setSearchParams, searchParams]);

  /*
  
  {
    text,
    star,
    complete,
    stamp
  }
  
  */

  useEffect(() => {
    localStorage.setItem("tasks", string);
    let x = string;
    if (x && x.length > 0) {
      x = x.split("_").filter((item) => item !== "");
      let arr = [];
      x.forEach((task) => {
        // stamp-text-star-complete
        let y = task.split("-");
        let obj = {
          stamp: y[0],
          text: y[1],
          star: y[2] === "0" ? false : true,
          complete: y[3] === "0" ? false : true,
        };
        arr.push(obj);
      });
      setTasks(arr);
    } else if (x) {
      setTasks([]);
    }
  }, [string]);

  useEffect(() => {
    let t = searchParams.get("tasks");
    setString(t);
  }, [searchParams]);

  function addTask(star, complete, text) {
    if (input.match(/[a-zA-Z0-9]/g)) {
      setInput("");
      let sp = searchParams.get("tasks");
      sp += `${Date.now()}-${text}-${star}-${complete}_`;
      sp = sp.replace("null", "");
      console.log(sp);
      setSearchParams(`tasks=${sp}`);
      setString(sp);
    }
  }

  function deleteTask(task) {
    let x = string.split("_").filter((item) => item !== "");
    x = x.filter((t) => !t.includes(task.stamp));
    if (x.length > 0) {
      x = x.reduce((str, t) => str + "_" + t);
      x += "_";
    }
    setString(x);
    setSearchParams(`tasks=${x}`);
    localStorage.setItem("tasks", x);
  }

  function handleStar(task) {
    let tasks = string.split("_").filter((item) => item !== "");
    let otherTasks = tasks.filter((t) => !t.includes(task.stamp));
    let thisTask = tasks.filter((t) => t.includes(task.stamp))[0];
    thisTask = thisTask.split("-");
    let star = thisTask[2];
    star = star === "0" ? "1" : "0";
    let str = `${thisTask[0]}-${thisTask[1]}-${star}-${thisTask[3]}`;
    if (otherTasks.length > 0) {
      otherTasks = otherTasks.reduce((st, task) => st + "_" + task) + "_";
    } else {
      otherTasks = "";
    }

    str = str + "_" + otherTasks;
    setString(str);
    localStorage.setItem("tasks", str);
    setSearchParams(`tasks=${str}`);
  }

  function handleComplete(task) {
    let tasks = string.split("_").filter((item) => item !== "");
    let otherTasks = tasks.filter((t) => !t.includes(task.stamp));
    let thisTask = tasks.filter((t) => t.includes(task.stamp))[0];
    thisTask = thisTask.split("-");
    let complete = thisTask[3];
    complete = complete === "0" ? "1" : "0";
    let str = `${thisTask[0]}-${thisTask[1]}-${thisTask[2]}-${complete}`;
    if (otherTasks.length > 0) {
      otherTasks = otherTasks.reduce((st, task) => st + "_" + task) + "_";
    } else {
      otherTasks = "";
    }
    str = str + "_" + otherTasks;
    setString(str);
    localStorage.setItem("tasks", str);
    setSearchParams(`tasks=${str}`);
  }

  return (
    <div className="Tasks">
      <div>
        <h1>
          Priority <span className="star">*</span>
        </h1>
        <ul>
          {tasks
            .filter((task) => task.star)
            .sort((a, b) => (a.stamp > b.stamp ? 1 : -1))
            .map((task, i) => (
              <Task
                task={task}
                key={i}
                deleteTask={deleteTask}
                handleStar={handleStar}
                handleComplete={handleComplete}
              />
            ))}
        </ul>
      </div>
      <div>
        <h1>Tasks</h1>
        <AddTask input={input} setInput={setInput} addTask={addTask} />
        <ul>
          {tasks
            .sort((a, b) => (a.stamp > b.stamp ? 1 : -1))
            .map((task, i) => (
              <Task
                task={task}
                key={i}
                deleteTask={deleteTask}
                handleStar={handleStar}
                handleComplete={handleComplete}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
