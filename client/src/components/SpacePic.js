import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SpaceCaption from "./SpaceCaption";

export default function SpacePic() {
  const [manifest, setManifest] = useState(null);
  const [pic, setPic] = useState(null);
  const [metaLink, setMetaLink] = useState(null);
  const [alt, setAlt] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);

  const [active, setActive] = useState(true);

  const params = useParams();

  useEffect(() => () => setActive(false), []);

  useEffect(() => {
    if (params) {
      let man = params.manifest;
      setManifest(man);
    }
  }, [params]);

  useEffect(() => {
    if (manifest && active) {
      fetch(manifest)
        .then((res) => res.json())
        .then((data) => {
          let meta = data.filter((item) => item.includes("metadata"))[0];
          let img = data.filter((img) => img.includes("orig"))[0];
          img = img.replace("http", "https");
          meta = meta.replace("http", "https");
          setPic(img);
          setMetaLink(meta);
        })
        .catch((err) => console.error(err));
    }
  }, [manifest, active]);

  useEffect(() => {
    if (metaLink && active) {
      let meta = metaLink;

      fetch(meta)
        .then((res) => res.json())
        .then((d) => {
          let t = d;
          t = t["AVAIL:Title"];
          setAlt(t);
          setTitle(t);
          let des = d;
          des = des["AVAIL:Description"];
          setDesc(des);
        })
        .catch((err) => console.error(err));
    }
  }, [metaLink, active]);

  return (
    <div>
      {pic ? <img src={pic} className="space-pic" alt={alt} /> : null}
      <SpaceCaption title={title} desc={desc} />
    </div>
  );
}

// https://images-assets.nasa.gov/image/PIA10120/collection.json (fantastic earth pic)
