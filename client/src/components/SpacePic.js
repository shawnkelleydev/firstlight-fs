import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SpacePic() {
  const [manifest, setManifest] = useState(null);
  const [pic, setPic] = useState(null);
  const [metaLink, setMetaLink] = useState(null);
  const [alt, setAlt] = useState(null);

  const params = useParams();

  useEffect(() => () => setPic(null), []);

  useEffect(() => {
    if (params) {
      let man = params.manifest;
      setManifest(man);
    }
  }, [params]);

  useEffect(() => {
    if (manifest) {
      fetch(manifest)
        .then((res) => res.json())
        .then((data) => {
          let m = data.filter((item) => item.includes("metadata"))[0];
          let img = data.filter((img) => img.includes("orig"))[0];
          setPic(img);
          setMetaLink(m);
        })
        .catch((err) => console.error(err));
    }
  }, [manifest]);

  useEffect(() => {
    if (metaLink) {
      fetch(metaLink)
        .then((res) => res.json())
        .then((d) => {
          let title = d;
          title = title["XMP:Title"];
          setAlt(title);
        })
        .catch((err) => console.error(err));
    }
  }, [metaLink]);

  return (
    <div>{pic ? <img src={pic} className="space-pic" alt={alt} /> : null}</div>
  );
}

// https://images-assets.nasa.gov/image/PIA10120/collection.json (fantastic earth pic)
