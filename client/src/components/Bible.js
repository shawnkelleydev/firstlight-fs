//dep
import { useState, useEffect } from "react";

//children
import BibleMenu from "./BibleMenu";
import BibleWelcome from "./BibleWelcome";
import BibleView from "./BibleView";

export default function Bible(props) {
  const [passage, setPassage] = useState(null);
  const [citation, setCitation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [queryValue, setQueryValue] = useState("");

  useEffect(() => {
    setQueryValue("Genesis");
  }, []);

  useEffect(() => {
    let url = "https://api.esv.org/v3/passage/html/?q=";
    url += citation;
    const Authorization = process.env.NASA;
    if (citation) {
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
  }, [citation]);

  function search(e) {
    e.preventDefault();
    setCitation(searchValue);
  }

  function query(e) {
    e.preventDefault();
    setCitation(queryValue);
  }

  return (
    <div className="Bible">
      {passage ? (
        <BibleView
          passage={passage}
          APOD={props.APOD}
          APODdesc={props.APODdesc}
          APODtitle={props.APODtitle}
        />
      ) : (
        <BibleWelcome
          APOD={props.APOD}
          APODdesc={props.APODdesc}
          APODtitle={props.APODtitle}
          vod={props.vod}
          vodCit={props.vodCit}
        />
      )}
      <BibleMenu
        search={(e) => search(e)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        query={(e) => query(e)}
        queryValue={queryValue}
        setQueryValue={setQueryValue}
        isHam={props.isHam}
      />
    </div>
  );
}
