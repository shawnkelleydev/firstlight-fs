import { useEffect, useState } from "react";

//children
import SpaceCaption from "./SpaceCaption";

export default function Space(props) {
  const [show, setShow] = useState(false);
  const [showSpacePic, setShowSpacePic] = useState(true);
  const [spacePic, setSpacePic] = useState(null);
  const [spacePicTitle, setSpacePicTitle] = useState(null);
  const [spacePicDesc, setSpacePicDesc] = useState(null);

  //captions
  const [showDesc, setShowDesc] = useState(false);

  //loading
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [points, setPoints] = useState("...");

  //error state
  const [error, setError] = useState(false);

  useEffect(() => {
    setShow(true);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (!spacePic) {
      setShowSpacePic(false);
      function getSubject() {
        let subject;
        subject = [
          "jupiter",
          "saturn",
          "planet",
          "pluto",
          "mercury",
          "venus",
          "galaxy",
          "nebula",
          "moon",
          "sun",
          "constellation",
          "neptune",
          "uranus",
          "comet",
          "mars",
          "earth",
        ];
        let n = Math.floor(Math.random() * subject.length);
        subject = subject[n];
        return subject;
      }

      function random(listLength) {
        let n = Math.floor(Math.random() * listLength);
        return n;
      }

      const q = getSubject();
      let url = "https://images-api.nasa.gov/search?q=" + q;
      let pic;
      //data processor
      function processData(data) {
        pic = data[0];
        pic =
          pic.includes(".jpg") ||
          pic.includes("png") ||
          pic.includes("jpeg") ||
          (pic && !pic.includes("video"))
            ? pic
            : null;
        return pic;
      }
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let hits = data.collection.metadata.total_hits;
          let pages = Math.ceil(hits / 100);
          pages = pages > 100 ? 100 : pages;
          let page = random(pages) + 1;
          url += "&page=" + page;
          fetch(url)
            .then((res) => res.json())
            .then((d) => {
              // NASA's api seems somewhat unconfigured for query parameters, so
              // much work is down here to filter results
              if (d) {
                let items = d.collection.items;
                let filtered = [];
                for (let i = 0; i < items.length; i++) {
                  let item = items[i];
                  let data = item.data[0];
                  let add = true;
                  //prepare all the things
                  // let year = parseInt(data.date_created.split("-")[0]);
                  let title = data.title.toLowerCase();
                  let desc = data.description_508
                    ? data.description_508
                    : data.description
                    ? data.description
                    : null;
                  if (desc) {
                    desc = desc.toLowerCase();
                  }
                  let keywords = data.keywords;
                  keywords =
                    keywords && keywords.length === 1 && keywords.includes(",")
                      ? keywords.split(",")
                      : keywords;
                  let center = data.center;
                  if (center) {
                    center = center.toLowerCase();
                  } else {
                    add = false;
                  }

                  if (desc) {
                    if (desc.includes("artist") || desc.includes("graph")) {
                      add = false;
                    }
                  }

                  if (center && !center.includes("jpl")) {
                    add = false;
                  }

                  if (
                    title.includes("artist") ||
                    title.includes("illustration") ||
                    title.includes("briefing") ||
                    title.includes("stats") ||
                    title.includes("simulation") ||
                    title.includes("diagram") ||
                    title.includes("computer generated")
                  ) {
                    add = false;
                  }

                  if (add) {
                    filtered.push(item);
                  }
                }
                let n = random(filtered.length);
                let item = filtered[n];
                if (item) {
                  let data = filtered[n].data[0];
                  let title = data.title;
                  let desc = data.description;
                  url = item.href;
                  fetch(url)
                    .then((res) => res.json())
                    .then((d) => {
                      url = processData(d); //returns null if file type invalid
                      if (url) {
                        setShowSpacePic(true);
                        setSpacePic(url);
                        setSpacePicTitle(title);
                        setSpacePicDesc(desc);
                      } else {
                        setSpacePic("x");
                      }
                    })
                    .catch((err) => {
                      console.error("Man down! ", err);
                      setError(true);
                    });
                } else {
                  setSpacePic("x");
                }
              } else {
                console.error("Man down! NASA sent us nothing.  Sheesh.");
                setError(true);
              }
            })
            .catch((err) => {
              console.error("Man down! ", err);
              setError(true);
            });
        })
        .catch((err) => {
          console.error("Man down! ", err);
          setError(true);
        });
    }
  }, [spacePic]);

  //handle null returns
  useEffect(() => {
    if (spacePic === "x") {
      setSpacePic(null);
    } else if (spacePic) {
      setShowSpacePic(true);
      setError(false);
    }
  }, [spacePic]);

  //set null to activate use effect fetches above
  function newPic() {
    setSpacePic(null);
  }

  //set loading state
  useEffect(() => {
    if (!showSpacePic) {
      setLoading(true);
      setSpacePicTitle(null);
      setSpacePicDesc(null);
    } else {
      setLoading(false);
    }
    //clean up
    return () => {
      setLoading(false);
    };
  }, [showSpacePic]);

  //activate count
  useEffect(() => {
    if (loading) {
      setCount(1);
      setTimeout(() => {
        setShowLoading(true);
      }, 500);
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  //increment count if loading
  useEffect(() => {
    if (loading) {
      //manage elipses points
      setPoints(count === 1 ? "•" : count === 2 ? "••" : "•••");
      setTimeout(() => {
        let n = count;
        if (n > 2) {
          n = 0;
        }
        setCount(n + 1);
      }, 333);
    }
  }, [count, loading]);

  return (
    <div className="Space">
      {!showSpacePic ? (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <h2 className="en-route">Getting a pic from NASA...</h2>
          {/* <img src={props.earthPic} alt="earth" className="nasa-earth-pic" /> */}
          <p className={showLoading ? "en-route-p" : "poof"}>Stand by.</p>
          <p className={showLoading ? "en-route-p" : "poof"}>{points}</p>
          <p className={error ? "warning" : "hide-error"}>
            There was an error. Try refreshing the page.
          </p>
        </div>
      ) : (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <img src={spacePic} className="space-pic" alt="space" />
        </div>
      )}
      <SpaceCaption
        showDesc={showDesc}
        spacePicTitle={spacePicTitle}
        spacePicDesc={spacePicDesc}
        setShowDesc={() => setShowDesc(!showDesc)}
        setShowSpacePic={() => setShowSpacePic(false)}
        newPic={() => newPic()}
        showSpacePic={showSpacePic}
      />
    </div>
  );
}
