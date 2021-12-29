import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { keys } from "./config";

//components
import Header from "./Header";
import Earth from "./Earth";
import Loading from "./Loading";
import { verses } from "./Verses";

function App() {
  const [earthPic, setEarthPic] = useState(null);
  const [earthPicDate, setEarthPicDate] = useState(null);
  const [vod, setVod] = useState(null);
  const [vodCit, setVodCit] = useState(null);

  //vod setter
  function selectVod() {
    let verse;
    verse = verses[Math.floor(Math.random() * verses.length)];
    setVodCit(verse);
  }

  useEffect(() => {
    //earthPic
    let url = "https://epic.gsfc.nasa.gov/api/natural";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let date = data[0].identifier.slice(0, 8);
        let img = data[0].image;
        let year = date.slice(0, 4);
        let month = date.slice(4, 6);
        let day = date.slice(6, 8);
        url =
          "https://epic.gsfc.nasa.gov" +
          "/archive/natural/" +
          year +
          "/" +
          month +
          "/" +
          day +
          "/png/" +
          img +
          ".png";
        setEarthPic(url);
        date = year + "-" + month + "-" + day;
        setEarthPicDate(date);
      })
      .catch((err) => console.error("NASA Man down! ", err));
    //fire select VOD
    selectVod();
  }, []);

  //VOD fire on change
  useEffect(() => {
    let url = "https://api.esv.org/v3/passage/html/?q=";
    url += vodCit;
    const Authorization = keys.ESVAPI;
    if (vodCit) {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const passage = data.passages[0];
          setVod(passage);
        })
        .catch((err) => console.error("ESV Fetch Error: ", err));
    }
  }, [vodCit]);

  function getVerse() {
    console.log("get verse");
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              earthPic ? (
                <Earth
                  pic={earthPic}
                  date={earthPicDate}
                  vod={vod}
                  vodCit={vodCit}
                  getVerse={() => getVerse()}
                />
              ) : (
                <Loading />
              )
            }
          />
          <Route path="data">
            <Route path="notes" />
            <Route path="prayer-list" />
            <Route path="tasks" />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
