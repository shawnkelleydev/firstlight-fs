import "normalize.css";
import "./css/App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Bible from "./components/Bible";
import Welcome from "./components/Welcome";
import Reader from "./components/Reader";
import Tasks from "./components/Tasks";
import Load from "./components/Load";
import Space from "./components/Space";
import Subject from "./components/Subject";
import Manifest from "./components/Manifest";
import Footer from "./components/Footer";

const nasaKey = process.env.REACT_APP_NASA;

export default function App() {
  // =======================================
  //  EARTH PIC
  // =======================================

  // calling here to avoid multiple calls

  const [pic, setPic] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${nasaKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        let n = Math.floor(Math.random() * d.length);
        let item = d[n];
        let img = item.image;
        let date = item.date;
        date = date.split(" ")[0].split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        date = year + "-" + month + "-" + day;
        setDate(date);
        url = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${img}.png?api_key=${nasaKey}`;
        setPic(url);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home pic={pic} date={date} />} />
          <Route path="bible" element={<Bible />}>
            <Route index element={<Welcome />} />
            <Route path=":passage" element={<Reader />} />
          </Route>
          <Route path="space" element={<Space />}>
            <Route path=":subject" element={<Subject />}>
              <Route path=":manifest" element={<Manifest />} />
            </Route>
          </Route>
          <Route path="tasks" element={<Tasks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Header />
      <Footer />
      <Load />
    </div>
  );
}
