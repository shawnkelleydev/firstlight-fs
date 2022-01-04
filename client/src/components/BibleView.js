import { useState } from "react";
import Interweave from "interweave";

//children
import BibleNotes from "./BibleNotes";
import BibleNavButtons from "./BibleNavButtons";

export default function BibleView(props) {
  const [errorState, setErrorState] = useState(false);

  const passage = props.passage;
  return (
    <div
      className="BibleView"
      style={{ backgroundImage: `url(${props.APOD})` }}
    >
      {!errorState ? (
        <div className="reading-parent">
          <div className="reading-div">
            <BibleNavButtons
              citation={props.citation}
              chapv={props.chapv}
              book={props.book}
              switchChapter={props.switchChapter}
              setErrorState={setErrorState}
              setBook={props.setBook}
              setChapv={props.setChapv}
            />
            <Interweave content={passage} />
            <BibleNavButtons
              citation={props.citation}
              chapv={props.chapv}
              book={props.book}
              switchChapter={props.switchChapter}
              setErrorState={setErrorState}
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
      ) : (
        <div className="reading-div">
          <h2>Houston, we have a problem.</h2>
          <h3>Please check your search input and try again.</h3>
        </div>
      )}
    </div>
  );
}
