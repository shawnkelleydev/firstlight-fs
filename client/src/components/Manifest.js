import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./SpaceMenu";
import Loading from "./Loading";

export default function Manifest() {
  const params = useParams();

  const [manifest, setManifest] = useState(params.manifest);
  const [img, setImg] = useState(null);
  const [metaLink, setMetaLink] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    return () => {
      setMetaLink(null);
      setManifest(null);
    };
  }, []);

  useEffect(() => {
    if (!params.manifest) {
      setManifest(null);
    }
  }, [params]);

  useEffect(() => {
    if (manifest) {
      fetch(manifest)
        .then((res) => res.json())
        .then((d) => {
          let pic = d.filter((img) => img.includes("orig"))[0];
          let m = d.filter((img) => img.includes("metadata"))[0];
          pic = !pic.includes("https") ? pic.replace("http", "https") : pic;
          setImg(pic);
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
          setTitle(d["AVAIL:Title"]);
          setDesc(d["AVAIL:Description"]);
        });
    }
  }, [metaLink]);

  return (
    <div className="Manifest">
      {img ? <img src={img} alt={title} /> : <Loading />}
      <Menu title={title} desc={desc} />
    </div>
  );
}
