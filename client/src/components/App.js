import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { keys } from "./config";

//children
import Header from "./Header";
import Earth from "./Earth";
import Loading from "./Loading";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Account from "./Account";
import Bible from "./Bible";
import { verses } from "./Verses";

function App() {
  // STATE

  //NASA state
  const [earthPic, setEarthPic] = useState(null);
  const [earthPicDate, setEarthPicDate] = useState(null);
  const [APOD, setAPOD] = useState(null);
  const [APODdesc, setAPODdesc] = useState(null);
  const [APODtitle, setAPODtitle] = useState(null);

  //VOD state
  const [vod, setVod] = useState(null);
  const [vodCit, setVodCit] = useState(null);

  //user state
  const [user, setUser] = useState(null);

  //signin state
  const [isSignUp, setIsSignUp] = useState(false);
  //controls and reference
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");

  //ham state
  const [isHam, setIsHam] = useState(true);

  //vod setter
  function getVerse() {
    let verse;
    verse = verses[Math.floor(Math.random() * verses.length)];
    setVodCit(verse);
  }

  //immediate calls
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
    getVerse();
    setUser({ user });

    url = "https://api.nasa.gov/planetary/apod?api_key=";
    url += keys.NASA;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAPOD(data.url);
        setAPODdesc(data.explanation);
        setAPODtitle(data.title);
      });
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

  //SIGN IN
  function signIn(e) {
    e.preventDefault();
    console.log("signin", email, password);
  }

  //SIGN UP
  function signUp(e) {
    e.preventDefault();
    console.log("signup", email, password, fName);
  }

  function signOut() {
    console.log("sign out");
    setUser(null);
    setPassword("");
    setEmail("");
    setFName("");
    localStorage.clear();
  }

  function handleHam() {
    setIsHam(!isHam);
  }

  //get new verse
  return (
    <div className="App">
      <Header
        user={user}
        signOut={() => signOut()}
        isHam={isHam}
        setIsHam={setIsHam}
        handleHam={handleHam}
      />
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
          <Route
            path="auth"
            element={
              isSignUp ? (
                <SignUp
                  submit={(e) => signUp(e)}
                  toggle={() => setIsSignUp(false)}
                  email={email}
                  password={password}
                  fName={fName}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setFName={setFName}
                />
              ) : (
                <SignIn
                  submit={(e) => signIn(e)}
                  toggle={() => setIsSignUp(true)}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              )
            }
          />
          {/* passing isHam to Bible.js because it is used to help regulate the position of BibleMenu.js */}
          <Route
            path="bible"
            element={
              <Bible
                isHam={isHam}
                APOD={APOD}
                APODtitle={APODtitle}
                APODdesc={APODdesc}
              />
            }
          />
          <Route path="account" element={<Account user={user} />} />
          <Route path="/signout" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
