import { useState, useEffect } from "react";
import "./styles.css";

// CHILDREN
import Task from "../Task";
import AddTask from "../AddTask";

// COMPONENT
export default function Tasks(props) {
  const [show, setShow] = useState(false);
  const [priority, setPriority] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loadObj, setLoadObj] = useState([]);

  // FOR ANIMATION
  useEffect(() => {
    setShow(true);
  }, []);

  // LOAD LOCALLY STORED ITEMS
  useEffect(() => {
    let arr = [];
    let keys = Object.keys(localStorage);
    keys.forEach((id) => {
      let item = localStorage.getItem(id);
      let text = item.split(",")[0];
      let list = item.split(",")[1];
      let isChecked = item.split(",")[2];
      let timeStamp = item.split(",")[3];
      let obj = {
        id,
        text,
        list,
        isChecked,
        timeStamp,
      };
      arr.push(obj);
    });
    setLoadObj(arr);
  }, []);

  useEffect(() => {
    let priorityArr = [];
    let tasksArr = [];
    loadObj.forEach((obj) => {
      if (typeof obj.isChecked === "string") {
        let value = obj.isChecked;
        obj.isChecked = value === "true" ? true : false;
      }
      if (obj.list === "priority") {
        priorityArr.push(obj);
      } else if (obj.list === "tasks") {
        tasksArr.push(obj);
      }
    });
    setPriority(priorityArr);
    setTasks(tasksArr);
  }, [loadObj]);

  // DELETE
  function handleDelete(e) {
    let id = e.target.id;
    let list = e.target.getAttribute("list");
    if (list === "priority") {
      setPriority(priority.filter((task) => task.id !== id));
    } else if (list === "tasks") {
      setTasks(tasks.filter((task) => task.id !== id));
    }
    localStorage.removeItem(id);
  }

  function handleChange(taskObj) {
    let obj = taskObj;
    obj.isChecked = !obj.isChecked;
    localStorage.removeItem(obj.id);
    localStorage.setItem(obj.id, [
      obj.text,
      obj.list,
      obj.isChecked,
      obj.timeStamp,
    ]);
    if (obj.list === "priority") {
      setPriority([...priority.filter((item) => item.id !== obj.id), obj]);
    } else {
      setTasks([...tasks.filter((item) => item.id !== obj.id), obj]);
    }
  }

  // RENDER
  return (
    <div className="Tasks">
      <div
        className="APOD-div"
        style={{
          backgroundImage: props.APOD ? `url(${props.APOD.url})` : null,
        }}
      >
        <div
          className={show ? "tasks-container" : "tasks-container hide-beneath"}
        >
          <h1>Priority</h1>
          <AddTask set={setPriority} prev={priority} list="priority" />
          <ul>
            {priority
              ? priority
                  .sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : -1))
                  .map((task, i) => (
                    <Task
                      task={task}
                      delete={handleDelete}
                      handleChange={handleChange}
                      key={i}
                    />
                  ))
              : null}
          </ul>
        </div>

        <div
          className={show ? "tasks-container" : "tasks-container hide-beneath"}
        >
          <h1>Tasks</h1>
          <AddTask set={setTasks} prev={tasks} list="tasks" />
          <ul>
            {tasks
              ? tasks
                  .sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : -1))
                  .map((task, i) => (
                    <Task
                      key={i}
                      task={task}
                      delete={handleDelete}
                      handleChange={handleChange}
                    />
                  ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
