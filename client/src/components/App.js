import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//children
import Header from "./Header";
import Earth from "./Earth";
import Loading from "./Loading";
// import Account from "./Account";
import Bible from "./Bible";
import Footer from "./Footer";
import About from "./About";
import Auth from "./Auth";
import Space from "./Space";
import SpacePic from "./SpacePic";
import { verses } from "./Verses";

//children children
import BibleWelcome from "./BibleWelcome";
import BibleView from "./BibleView";

function App() {
  // STATE

  //SCROLL -----------------------------------------------
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [y, setY] = useState(0);
  const [prevY, setPrevY] = useState(0);
  // const [size, setSize] = useState(window.innerWidth);

  //NASA -----------------------------------------------
  // EARTH
  const [earthPic, setEarthPic] = useState(null);
  const [earthPicDate, setEarthPicDate] = useState(null);
  // APOD
  const [APOD, setAPOD] = useState(null);
  const [APODdesc, setAPODdesc] = useState(null);
  const [APODtitle, setAPODtitle] = useState(null);

  //VOD -----------------------------------------------
  const [vod, setVod] = useState(null);
  const [vodCit, setVodCit] = useState(null);

  //USER -----------------------------------------------
  // const [user, setUser] = useState(null);

  //CONTROLS -------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");

  //HAM -----------------------------------------------
  const [isHam, setIsHam] = useState(true);

  //EFFECTS / FUNCTIONS -------------------------------

  //vod setter w/ immediate repeat preventer
  function getVerse() {
    let verse;
    let ding = false;
    //prevent repeats
    while (!ding) {
      verse = verses[Math.floor(Math.random() * verses.length)];
      ding = verse !== vodCit ? true : false;
    }
    setVodCit(verse);
  }

  const nasa = process.env.REACT_APP_NASA;
  const esv = process.env.REACT_APP_ESVAPI;

  //scroll listen
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setY(window.pageYOffset);
    });
  }, []);

  //prev y monitor
  useEffect(() => {
    function fire() {
      setPrevY(window.pageYOffset);
    }
    setInterval(fire, 2000);
  }, []);

  //scroll status
  useEffect(() => {
    setIsScrollUp(prevY > y ? true : false);
    setIsScrollDown(y > prevY ? true : false);
  }, [y, prevY]);

  //immediate NASA calls
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
    //APOD
    url = "https://api.nasa.gov/planetary/apod?api_key=";
    url += nasa;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAPOD(data.url);
        setAPODdesc(data.explanation);
        setAPODtitle(data.title);
      });
  }, [nasa]);

  //VOD intial fire
  useEffect(() => {
    let verse;
    let n = Math.floor(Math.random() * verses.length);
    // let n = verses.length - 2;
    verse = verses[n];
    setVodCit(verse);
  }, []);

  //VOD fire on change
  useEffect(() => {
    let url = "https://api.esv.org/v3/passage/html/?q=";
    url += vodCit;
    const Authorization = esv;
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
  }, [vodCit, esv]);

  //SIGN IN
  function signIn(e) {
    e.preventDefault();
  }

  //SIGN UP
  function signUp(e) {
    e.preventDefault();
  }

  // function signOut() {
  //   console.log("sign out");
  //   setUser(null);
  //   setPassword("");
  //   setEmail("");
  //   setFName("");
  //   localStorage.clear();
  // }

  function handleHam() {
    setIsHam(!isHam);
  }

  const [show, setShow] = useState(true);

  //set true if scrolls up, set false if scrolls down, hide if inactive
  useEffect(() => {
    if (isScrollUp) {
      setShow(true);
    } else if (isScrollDown) {
      setShow(false);
    }
  }, [isScrollUp, isScrollDown]);

  // NASA PIC DATA
  const [data, setData] = useState(null);

  // RENDER --------------------------------------------------

  //get new verse
  return (
    <div className="App">
      <span id="top" />
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
                <Loading earthPic={!earthPic} />
              )
            }
          />
          <Route
            path="auth"
            element={
              <Auth
                pic={earthPic}
                signUp={(e) => signUp(e)}
                email={email}
                password={password}
                fName={fName}
                setEmail={setEmail}
                setPassword={setPassword}
                setFName={setFName}
                signIn={(e) => signIn(e)}
              />
            }
          />
          {/* passing isHam to Bible.js because it is used to help regulate the position of BibleMenu.js */}
          <Route
            path="bible"
            element={
              <Bible
                APOD={APOD}
                APODtitle={APODtitle}
                APODdesc={APODdesc}
                vodCit={vodCit}
                //--------------------
                isHam={isHam}
              />
            }
          >
            <Route index element={<Navigate replace to={"/bible/welcome"} />} />
            <Route
              path="welcome"
              element={
                <BibleWelcome
                  APOD={APOD}
                  APODdesc={APODdesc}
                  APODtitle={APODtitle}
                  vod={vod}
                  vodCit={vodCit}
                />
              }
            />
            <Route
              path=":query"
              element={
                <BibleView
                  APOD={APOD}
                  APODdesc={APODdesc}
                  APODtitle={APODtitle}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate replace to="/bible/welcome" />}
            />
          </Route>
          <Route path="space" element={<Space setData={setData} />}>
            <Route path=":img" element={<SpacePic data={data} />} />
          </Route>
          <Route
            path="about"
            element={<About pic={earthPic} date={earthPicDate} />}
          />
          <Route path="signout" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      {/* header here because css places latter elements on top of former elements--see https://coder-coder.com/z-index-isnt-working/ */}
      <Header
        // user={user}
        // signOut={() => signOut()}
        isHam={isHam}
        setIsHam={setIsHam}
        handleHam={handleHam}
        show={show}
      />
      <Footer />
    </div>
  );
}

export default App;
