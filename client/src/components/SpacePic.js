import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SpaceCaption from "./SpaceCaption";

export default function SpacePic(props) {
  const [show, setShow] = useState(false);
  // SPACE PICS
  const [showSpacePic, setShowSpacePic] = useState(true);
  const [spacePic, setSpacePic] = useState(null);
  const [spacePicTitle, setSpacePicTitle] = useState(null);
  const [spacePicDesc, setSpacePicDesc] = useState(null);
  // CAPTION HANDLING
  const [showDesc, setShowDesc] = useState(false);
  // ERROR
  const [error, setError] = useState(false);
  // LOCATION AND NAVIGATION
  let location = useLocation();

  //memory leak fix
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      let manifest = location.search;
      manifest = manifest.replace("?", "");
      fetch(manifest)
        .then((res) => res.json())
        .then((data) => {
          let pic = data[0];
          pic =
            !pic.includes("https") && pic.includes("http")
              ? pic.replace("http", "https")
              : pic;
          console.log(pic);
          setSpacePic(pic);
          let meta = data[data.length - 1];
          meta =
            !meta.includes("https") && meta.includes("http")
              ? meta.replace("http", "https")
              : meta;
          fetch(meta)
            .then((res) => res.json())
            .then((d) => {
              let entries = Object.entries(d);
              let title = [];
              let desc = [];
              entries.forEach((entry) => {
                if (entry[0].toLowerCase().includes("avail:title")) {
                  title.push({ key: entry[0], data: entry[1] });
                } else if (
                  entry[0].toLowerCase().includes("avail:description")
                ) {
                  desc.push({ key: entry[0], data: entry[1] });
                }
              });
              desc = desc[0].data;
              title = title[0].data;
              setSpacePicTitle(title);
              setSpacePicDesc(desc !== title ? desc : null);
              setError(false);
            })
            .catch((err) => {
              console.error("problems in SpacePic.js: ", err);
              setError(true);
            });
        })
        .catch((err) => {
          console.error("problem with fetching the manifest: ", err);
          setError(true);
        });
    }
  }, [location, isActive]);

  return (
    <div className={show ? "space-content-div" : "space-content-div hide"}>
      {!error ? (
        <img src={spacePic} className="space-pic" alt="space" />
      ) : (
        <h2>There was a problem. Please try again.</h2>
      )}
      <SpaceCaption
        showDesc={showDesc}
        spacePicTitle={spacePicTitle}
        spacePicDesc={spacePicDesc}
        setShowDesc={() => setShowDesc(!showDesc)}
        setShowSpacePic={() => setShowSpacePic(false)}
        newPic={props.newPic}
        showSpacePic={showSpacePic}
      />
    </div>
  );
}

// https://images-assets.nasa.gov/image/PIA10120/collection.json (fantastic earth pic)
