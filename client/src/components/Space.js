import { useEffect, useState } from "react";
import Interweave from "interweave";

export default function Space(props) {
  const [show, setShow] = useState(false);
  const [showSpacePic, setShowSpacePic] = useState(true);
  const [spacePic, setSpacePic] = useState(null);
  const [spacePicTitle, setSpacePicTitle] = useState(null);
  const [spacePicDesc, setSpacePicDesc] = useState(null);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    setShowSpacePic(spacePic ? true : false);
    console.log(spacePic);
  }, [spacePic]);

  //selects random number
  function randomN(list) {
    return Math.floor(Math.random() * list.length);
  }

  //async call for pic
  function getPic() {
    //picks random subject for query
    const q = picSubject();
    let url = "https://images-api.nasa.gov/search?q=" + q;
    //go get stuff
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let items = data.collection.items;
        items = items.filter(
          (item) =>
            //filter for relevance
            item.data[0].title.toLowerCase().includes(q) &&
            parseInt(item.data[0].date_created.split("-")[0]) > 2000 &&
            !item.data[0].description.toLowerCase().includes("celebration") &&
            !item.data[0].description.toLowerCase().includes("guests") &&
            !item.data[0].description.toLowerCase().includes("gif")
        );
        //get random number for index
        let n = randomN(items);
        //choose item
        let item = items[n];
        let href = item.href;
        let desc = item.data[0].description;
        let title = item.data[0].title;
        setSpacePicDesc(desc);
        setSpacePicTitle(title);
        //get the item manifest
        fetch(href)
          .then((res) => res.json())
          .then((data) => {
            //check for not tif
            let pic = !data[0].includes(".tif")
              ? data[0]
              : !data[1].includes("tif")
              ? data[1]
              : null;
            pic = !pic.includes(".mp4") ? pic : null;
            setSpacePic(pic);
          });
      })
      .catch((err) => console.error("NASA image search Man Down! ", err));
  }

  //get pic
  useEffect(() => {
    //picks random subject for query
    if (!spacePic) {
      const q = picSubject();
      let url = "https://images-api.nasa.gov/search?q=" + q;
      //go get stuff
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let items = data.collection.items;
          items = items.filter(
            (item) =>
              //filter for relevance
              item.data[0].title.toLowerCase().includes(q) &&
              parseInt(item.data[0].date_created.split("-")[0]) > 2000 &&
              !item.data[0].description.toLowerCase().includes("celebration") &&
              !item.data[0].description.toLowerCase().includes("guests") &&
              !item.data[0].description.toLowerCase().includes("gif")
          );
          //get random number for index
          let n = randomN(items);
          //choose item
          let item = items[n];
          console.log(item);
          let href = item.href;
          let desc = item.data[0].description;
          let title = item.data[0].title;
          setSpacePicDesc(desc);
          setSpacePicTitle(title);
          //get the item manifest
          fetch(href)
            .then((res) => res.json())
            .then((data) => {
              //check for not tif
              let pic = data[0];
              pic =
                !pic.includes(".mp4") &&
                !pic.includes(".mp3") &&
                !pic.includes(".srt") &&
                !pic.includes(".tif")
                  ? pic
                  : null;
              setSpacePic(pic);
            });
        })
        .catch((err) => console.error("NASA image search Man Down! ", err));
    }
  }, [spacePic]);

  //pics a random subject for query
  function picSubject() {
    let subject;
    subject = [
      "mars",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
      "pluto",
      "mercury",
      "venus",
      "galaxy",
      "nebula",
      "moon",
      "sun",
    ];
    let n = Math.floor(Math.random() * subject.length);
    subject = subject[n];
    return subject;
  }

  return (
    <div className="Space">
      {!showSpacePic ? (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <h2>Space pic en route...</h2>
        </div>
      ) : (
        <div className={show ? "space-content-div" : "space-content-div hide"}>
          <img src={spacePic} className="space-pic" alt="space" />
          <div className="caption-container">
            <div className={showDesc ? "caption" : "caption hide-caption"}>
              <div className="caption-buttons">
                <button className="get-space-pic" onClick={() => getPic()}>
                  get pic &rarr;
                </button>
                <button
                  className="get-space-pic"
                  onClick={() => setShowDesc(!showDesc)}
                >
                  {showDesc ? "hide" : "show"}
                </button>
              </div>
              <h3>{spacePicTitle}</h3>
              <div className="desc-div">
                {spacePicTitle !== spacePicDesc ? (
                  <Interweave content={spacePicDesc} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
