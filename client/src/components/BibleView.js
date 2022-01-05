import { useState, useEffect } from "react";
import Interweave from "interweave";
import { useLocation } from "react-router-dom";

//children
import BibleNotes from "./BibleNotes";
import BibleNavButtons from "./BibleNavButtons";

export default function BibleView(props) {
  const [query, setQuery] = useState(null);
  const [passage, setPassage] = useState(null);

  const location = useLocation().pathname;
  const esv = process.env.REACT_APP_ESVAPI;

  // GET QUERY
  useEffect(() => {
    let cit = location.split("/");
    cit = cit[cit.length - 1]; //get last param
    setQuery(cit);
  }, [location]);

  // MAKE CALL
  useEffect(() => {
    if (query) {
      let url = "https://api.esv.org/v3/passage/html/?q=";
      let Authorization = esv;
      url += query;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [query]);

  return (
    <div
      className="BibleView"
      style={{ backgroundImage: `url(${props.APOD})` }}
    >
      <div className="reading-parent">
        <div className="reading-div">
          <BibleNavButtons
            citation={props.citation}
            chapv={props.chapv}
            book={props.book}
            switchChapter={props.switchChapter}
            setBook={props.setBook}
            setChapv={props.setChapv}
          />
          {/* <Interweave content={passage} /> */}
          <BibleNavButtons
            citation={props.citation}
            chapv={props.chapv}
            book={props.book}
            switchChapter={props.switchChapter}
            setBook={props.setBook}
            setChapv={props.setChapv}
          />
        </div>
        <div className="user-stuff-container">
          <BibleNotes
            citation={props.citation}
            book={props.book}
            chapv={props.chapv}
          />
        </div>
      </div>
    </div>
  );
}

// {
//   !errorState ? (
// <div className="reading-parent">
//   <div className="reading-div">
//     <BibleNavButtons
//       citation={props.citation}
//       chapv={props.chapv}
//       book={props.book}
//       switchChapter={props.switchChapter}
//       setErrorState={setErrorState}
//       setBook={props.setBook}
//       setChapv={props.setChapv}
//     />
//     {/* <Interweave content={passage} /> */}
//     <BibleNavButtons
//       citation={props.citation}
//       chapv={props.chapv}
//       book={props.book}
//       switchChapter={props.switchChapter}
//       setErrorState={setErrorState}
//       setBook={props.setBook}
//       setChapv={props.setChapv}
//     />
//   </div>
//   <div className="user-stuff-container">
//     <BibleNotes
//       citation={props.citation}
//       book={props.book}
//       chapv={props.chapv}
//     />
//   </div>
// </div>
//   ) : (
//     <div className="reading-div">
//       <h2>Houston, we have a problem.</h2>
//       <h3>Please check your search input and try again.</h3>
//     </div>
//   );
// }
