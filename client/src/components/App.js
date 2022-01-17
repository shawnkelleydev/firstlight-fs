import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
import Home from "./Home";
import Tasks from "./Tasks";
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

  //USER -----------------------------------------------
  // const [user, setUser] = useState(null);

  //CONTROLS -------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");

  //HAM -----------------------------------------------
  const [isHam, setIsHam] = useState(true);

  //EFFECTS / FUNCTIONS -------------------------------

  const navigate = useNavigate();

  //gets new verse / navigates to new url (picked up in VOD.js)
  function getVerse() {
    let verse;
    verse = verses[Math.floor(Math.random() * verses.length)];
    navigate(`/verse/${verse}`, { replace: true });
  }

  const nasa = process.env.REACT_APP_NASA;
  // const esv = process.env.REACT_APP_ESVAPI;

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
        const apod = {
          url: data.url,
          description: data.explanation,
          title: data.title,
        };
        setAPOD(apod);
      });
  }, [nasa]);

  //SIGN IN
  function signIn(e) {
    e.preventDefault();
  }

  //SIGN UP
  function signUp(e) {
    e.preventDefault();
  }

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

  // NASA PIC DATA (plumbing work -- do not change)
  const [data, setData] = useState(null);
  const [newPic, setNewPic] = useState(false);

  const newImage = () => {
    setNewPic(true);
  };

  // RENDER --------------------------------------------------

  //get new verse
  return (
    <div className="App">
      <span id="top" />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="verse">
            <Route
              index
              path=":verse"
              element={
                earthPic ? (
                  <Earth
                    pic={earthPic}
                    date={earthPicDate}
                    getVerse={() => getVerse()}
                  />
                ) : (
                  <Loading earthPic={!earthPic} />
                )
              }
            />
          </Route>
          {/* </Route> */}
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
          <Route path="bible" element={<Bible isHam={isHam} />}>
            <Route index element={<Navigate replace to={"/bible/welcome"} />} />
            <Route path="welcome" element={<BibleWelcome APOD={APOD} />} />
            <Route path=":query" element={<BibleView APOD={APOD} />} />
            <Route
              path="*"
              element={<Navigate replace to="/bible/welcome" />}
            />
          </Route>
          <Route
            path="space"
            element={
              <Space setData={setData} newPic={newPic} setNewPic={setNewPic} />
            }
          >
            <Route
              path=":img"
              element={<SpacePic data={data} newPic={() => newImage()} />}
            />
          </Route>
          <Route path="tasks" element={<Tasks APOD={APOD} />} />
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
