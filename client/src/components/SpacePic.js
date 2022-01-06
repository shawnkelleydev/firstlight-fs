import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

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

  useEffect(() => {
    setShow(true);
    let manifest = location.search;
    manifest = manifest.replace("?", "");
    fetch(manifest)
      .then((res) => res.json())
      .then((data) => {
        let meta = data[data.length - 1];
        console.log(meta);
      });
  }, [location]);

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
  return (
    <div className={show ? "space-content-div" : "space-content-div hide"}>
      <img src={spacePic} className="space-pic" alt="space" />
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
