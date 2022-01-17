import { useState, useEffect } from "react";
import "./styles.css";

// CHILDREN
import Task from "../Task";
import AddTask from "../AddTask";

// COMPONENT
export default function Tasks(props) {
  const [show, setShow] = useState(false);
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
    keys.forEach((key) => {
      if (key.includes("task")) {
        let item = localStorage.getItem(key);
        let id = key.split("-")[1];
        let burst = item.split(",");
        let text = burst[0];
        let list = burst[1];
        let isChecked = burst[2];
        let isPriority = burst[3];
        let timeStamp = burst[4];
        let obj = {
          id,
          text,
          list,
          isChecked,
          isPriority,
          timeStamp,
        };
        arr.push(obj);
      }
    });
    setLoadObj(arr);
  }, []);

  useEffect(() => {
    let tasksArr = [];
    loadObj.forEach((obj) => {
      // CORRECT TYPE ISSUES
      if (typeof obj.isChecked === "string") {
        let value = obj.isChecked;
        obj.isChecked = value === "true" ? true : false;
      }
      if (typeof obj.isPriority === "string") {
        let value = obj.isPriority;
        obj.isPriority = value === "true" ? true : false;
      }
      tasksArr.push(obj);
    });
    setTasks(tasksArr);
  }, [loadObj]);

  // DELETE
  function handleDelete(e) {
    let id = e.target.id;
    setTasks(tasks.filter((task) => task.id !== id));
    id = "task-" + id;
    localStorage.removeItem(id);
  }

  function handleChange(taskObj) {
    let obj = taskObj;
    obj.isChecked = !obj.isChecked;
    let id = `task-${obj.id}`;
    localStorage.removeItem(id);
    localStorage.setItem(id, [
      obj.text,
      obj.list,
      obj.isChecked,
      obj.isPriority,
      obj.timeStamp,
    ]);
    setTasks([...tasks.filter((item) => item.id !== obj.id), obj]);
  }

  function handlePriority(taskObj) {
    let obj = taskObj;
    obj.isPriority = !obj.isPriority;
    let id = `task-${obj.id}`;
    localStorage.removeItem(id);
    localStorage.setItem(id, [
      obj.text,
      obj.list,
      obj.isChecked,
      obj.isPriority,
      obj.timeStamp,
    ]);
    setTasks([...tasks.filter((item) => item.id !== obj.id), obj]);
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
          <h1>
            Priority{" "}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star-of-life"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 512"
              className="header-svg"
            >
              <path
                fill="currentColor"
                d="M471.99 334.43L336.06 256l135.93-78.43c7.66-4.42 10.28-14.2 5.86-21.86l-32.02-55.43c-4.42-7.65-14.21-10.28-21.87-5.86l-135.93 78.43V16c0-8.84-7.17-16-16.01-16h-64.04c-8.84 0-16.01 7.16-16.01 16v156.86L56.04 94.43c-7.66-4.42-17.45-1.79-21.87 5.86L2.15 155.71c-4.42 7.65-1.8 17.44 5.86 21.86L143.94 256 8.01 334.43c-7.66 4.42-10.28 14.21-5.86 21.86l32.02 55.43c4.42 7.65 14.21 10.27 21.87 5.86l135.93-78.43V496c0 8.84 7.17 16 16.01 16h64.04c8.84 0 16.01-7.16 16.01-16V339.14l135.93 78.43c7.66 4.42 17.45 1.8 21.87-5.86l32.02-55.43c4.42-7.65 1.8-17.43-5.86-21.85z"
              ></path>
            </svg>
          </h1>
          {tasks
            ? tasks
                .filter((task) => task.isPriority)
                .sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : -1))
                .map((task, i) => (
                  <Task
                    key={i}
                    task={task}
                    delete={handleDelete}
                    handleChange={handleChange}
                    handlePriority={handlePriority}
                  />
                ))
            : null}
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
                      handlePriority={handlePriority}
                    />
                  ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
