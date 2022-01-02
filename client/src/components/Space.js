import { useEffect, useState } from "react";

//children
import SpaceCaption from "./SpaceCaption";

export default function Space(props) {
  const [show, setShow] = useState(false);
  const [showSpacePic, setShowSpacePic] = useState(true);
  const [spacePic, setSpacePic] = useState(null);
  const [spacePicTitle, setSpacePicTitle] = useState(null);
  const [spacePicDesc, setSpacePicDesc] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
  const [loadFail, setLoadFail] = useState(false);

  useEffect(() => {
    setShow(true);
    setShowSpacePic(false);
  }, []);

  //get pic / fire again if null
  useEffect(() => {
    //picks random subject for query
    setShowSpacePic(false);

    //picks a random subject for query
    function getSubject() {
      let subject;
      subject = [
        "mars",
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
      ];
      let n = Math.floor(Math.random() * subject.length);
      subject = subject[n];
      return subject;
    }

    function random(listLength) {
      let n = Math.floor(Math.random() * listLength) + 1;
      return n;
    }

    //go get stuff
    if (!spacePic) {
      const q = getSubject();
      let url = "https://images-api.nasa.gov/search?q=" + q;
      let pic;
      function processData(data) {
        pic = data[0];
        pic =
          !pic.includes(".mp3") &&
          !pic.includes(".mp4") &&
          !pic.includes(".srt") &&
          !pic.includes(".tif") &&
          !pic.includes("video")
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
          let page = random(pages);
          url += "&page=" + page;
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                console.log(data);
                let items = data.collection.items;
                items = items.filter(
                  (item) =>
                    parseInt(item.data[0].date_created.split("-")[0]) > 2000 &&
                    !item.data[0].description
                      .toLowerCase()
                      .includes("overview") &&
                    !item.data[0].description
                      .toLowerCase()
                      .includes("public affairs") &&
                    !item.data[0].description
                      .toLowerCase()
                      .includes("briefing") &&
                    !item.data[0].description.toLowerCase().includes("monument")
                );
                let n = random(items.length);
                let item = items[n];
                console.log(item);
                let title = item.data[0].title;
                let desc = item.data[0].description;
                url = item.href;
                fetch(url)
                  .then((res) => res.json())
                  .then((data) => {
                    pic = processData(data);
                    if (pic) {
                      setSpacePicTitle(title);
                      setSpacePicDesc(desc);
                      setSpacePic(pic);
                    } else {
                      setSpacePic("x");
                      setSpacePic(null);
                    }
                  })
                  .catch((err) => console.error("Man down! ", err));
              } else {
                console.error("No data received from the API.");
              }
            })
            .catch((err) => console.error("Man down! ", err));
        })
        .catch((err) => console.error("Man down! ", err));
    }
  }, [spacePic]);

  //show hide pic based on status
  useEffect(() => {
    setShowSpacePic(spacePic ? true : false);
  }, [spacePic]);

  //for showing loading messages when loads fail
  useEffect(() => {
    function setTrue() {
      setLoadFail(true);
    }
    if (!showSpacePic) {
      setTimeout(setTrue, 3000);
    } else {
      setLoadFail(false);
    }
  }, [showSpacePic, loadFail]);

  return (
    <div className="Space">
      {!showSpacePic ? (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <h2 className="en-route">Space pic en route from NASA...</h2>
          <p className={loadFail ? "en-route-p" : "poof"}>
            Houston, we may have a problem...
          </p>
          <p className={loadFail ? "en-route-p" : "poof"}>
            If nothing happens, try clicking "get pic", or refresh the page.
          </p>
          <SpaceCaption
            showDesc={showDesc}
            spacePicTitle={spacePicTitle}
            spacePicDesc={spacePicDesc}
            setShowDesc={() => setShowDesc(!showDesc)}
            showSpacePic={showSpacePic}
            setSpacePic={() => setSpacePic(null)}
          />
        </div>
      ) : (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <img src={spacePic} className="space-pic" alt="space" />
          <SpaceCaption
            showDesc={showDesc}
            spacePicTitle={spacePicTitle}
            spacePicDesc={spacePicDesc}
            setShowDesc={() => setShowDesc(!showDesc)}
            showSpacePic={showSpacePic}
            setSpacePic={() => setSpacePic(null)}
          />
        </div>
      )}
    </div>
  );
}
