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

  // BIBLE ------------------------------------------------------

  const [passage, setPassage] = useState(null);
  const [citation, setCitation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [bookValue, setBookValue] = useState("");
  const [book, setBook] = useState(null);
  const [chapv, setChapv] = useState(null);
  // const [isVOD, setIsVOD] = useState(false);

  useEffect(() => {
    setBookValue("Genesis");
  }, []);

  useEffect(() => {
    if (citation) {
      let url = "https://api.esv.org/v3/passage/html/?q=";
      url += citation;
      const Authorization = esv;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const newPassage = data.passages[0];
          setPassage(newPassage);
        })
        .catch((err) => console.error("ESV Fetch Error: ", err));
    }
    //hide everything for reading
  }, [citation, esv]);

  function search(e) {
    e.preventDefault();
    //standardize citations "n  bk ch:v"
    let value = searchValue;

    if (value.includes(" ")) {
      value = value.replaceAll(" ", "");
    }
    let numbers = /[0-9]+/g;
    let words = /[a-zA-Z]+/g;
    numbers = value.match(numbers);
    words = value.match(words);

    let bookNumber = false;

    if (numbers) {
      numbers.forEach((number) => {
        if (value.indexOf(number) === 0) {
          bookNumber = true;
        }
      });
    }
    //fixes most  books
    let bk = bookNumber ? numbers[0] + " " + words[0] : words[0];
    let bookString = bookNumber ? numbers[0] + words[0] : words[0];
    //flatten
    bk = bk.toLowerCase();
    //correct psalms and proverbs
    bk = bk === "psalm" ? "psalms" : bk === "proverb" ? "proverbs" : bk;
    //correct for Song of Solomon weirdness
    bk = bk.toLowerCase().includes("song") ? "song of solomon" : bk;
    let chv = numbers ? value : null;
    if (chv) {
      chv = value.split(bookString)[1];
    }

    let cit = chv ? bk + " " + chv : bk;
    setCitation(cit);
    setBook(bk);
    setChapv(chv);
  }

  function getBook(e) {
    e.preventDefault();
    let bk = bookValue;
    bk = bk.toLowerCase();
    setCitation(bk);
    setBook(bk);
    setChapv(1);
  }

  //  BIBLE NAVIGATION
  function switchChapter(citation) {
    setCitation(citation);
  }

  let navigate = useNavigate();

  //control
  const [isNavigate, setIsNavigate] = useState(false);

  useEffect(() => {
    if (citation && citation !== "") {
      setIsNavigate(true);
    } else {
      setIsNavigate(false);
    }

    return () => {
      setIsNavigate(false);
    };
  }, [citation]);

  useEffect(() => {
    if (isNavigate) {
      navigate("/bible/query", { replace: true });
    }
    setIsNavigate(false);
  }, [isNavigate, navigate]);

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
                search={(e) => search(e)}
                book={(e) => getBook(e)}
                //--------------------
                searchValue={searchValue}
                bookValue={bookValue}
                //--------------------
                setSearchValue={setSearchValue}
                setBookValue={setBookValue}
                //--------------------
                isHam={isHam}
              />
            }
          >
            <Route
              index
              element={
                <Navigate
                  replace
                  to={citation ? "/bible/read" : "/bible/welcome"}
                />
              }
            />
            <Route
              path="query"
              element={
                passage ? (
                  <Navigate replace to="/bible/read" />
                ) : (
                  <Loading passage={!passage} />
                )
              }
            />
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
              path="read"
              element={
                passage ? (
                  <BibleView
                    book={book}
                    chapv={chapv}
                    setBook={setBook}
                    setChapv={setChapv}
                    citation={citation}
                    passage={passage}
                    APOD={APOD}
                    APODdesc={APODdesc}
                    APODtitle={APODtitle}
                    switchChapter={switchChapter}
                  />
                ) : (
                  <Navigate repalce to="/bible/welcome" />
                )
              }
            />
            <Route
              path="*"
              element={<Navigate replace to="/bible/welcome" />}
            />
          </Route>
          <Route
            path="about"
            element={<About pic={earthPic} date={earthPicDate} />}
          />
          <Route
            path="space"
            element={<Space nasaKey={nasa} earthPic={earthPic} />}
          />
          {/* <Route path="account" element={<Account user={user} />} /> */}
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
