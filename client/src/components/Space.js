import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

//children
import SpaceLoading from "./SpaceLoading";

export default function Space(props) {
  // LOADING
  const [loading, setLoading] = useState(false);

  const [fire, setFire] = useState(false);
  const [error, setError] = useState(null);
  const [spacePic, setSpacePic] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  //cleanup
  useEffect(() => {
    return () => setFire(false);
  }, []);

  useEffect(() => {
    let newPic = props.newPic;
    if (newPic) {
      setSpacePic(null);
      setFire(true);
      props.setNewPic(false);
    }
  }, [props]);

  useEffect(() => {
    if (location.pathname.includes("q")) {
      let q = location.search;
      q = q.replace("?", "");
      setSpacePic(q);
      setFire(false);
      setLoading(false);
      setError(false);
    } else {
      setFire(true);
      setLoading(true);
    }
  }, [location]);

  //end loading state
  useEffect(() => {
    setLoading(spacePic && spacePic !== "x" ? false : true);
  }, [spacePic]);

  //set spacepic && nav
  useEffect(() => {
    if (spacePic === "x") {
      setSpacePic(null);
      setFire(true);
    } else if (spacePic) {
      let pic = spacePic;
      let url = `q?${pic}`;
      navigate(url, { replace: true });
    }
  }, [spacePic, navigate]);

  // get space pic manifest
  useEffect(() => {
    if (!spacePic && fire) {
      function processData(data) {
        let pic = data[0];
        pic = pic.includes("video") ? false : pic;
        pic =
          (pic && pic.includes(".jpg")) ||
          (pic && pic.includes(".png")) ||
          (pic && pic.includes(".jpeg"))
            ? pic
            : false;
        return pic;
      }

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

      //get manifest / send in url
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
                  url = item.href;
                  fetch(url)
                    .then((res) => res.json())
                    .then((d) => {
                      let valid = processData(d);
                      if (valid) {
                        setSpacePic(url);
                      } else {
                        setSpacePic("x");
                      }
                      setError(false);
                    })
                    .catch((err) => {
                      console.error("problem with the manifest: ", err);
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
  }, [spacePic, fire]);

  return (
    <div className="Space">
      {loading ? <SpaceLoading error={error} /> : <Outlet />}
    </div>
  );
}
