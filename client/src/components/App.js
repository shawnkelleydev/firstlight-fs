import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { keys } from "./config";

//children
import Header from "./Header";
import Earth from "./Earth";
import Loading from "./Loading";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { verses } from "./Verses";

function App() {
  // STATE
  const [earthPic, setEarthPic] = useState(null);
  const [earthPicDate, setEarthPicDate] = useState(null);
  const [vod, setVod] = useState(null);
  const [vodCit, setVodCit] = useState(null);
  const [user, setUser] = useState(null);

  //signin state
  const [isSignUp, setIsSignUp] = useState(false);
  //controls and reference
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");

  //vod setter
  function getVerse() {
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
    getVerse();
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

  return (
    <div className="App">
      <Header user={user} signOut={() => signOut()} />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
