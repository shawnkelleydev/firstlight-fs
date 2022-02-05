import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Subject() {
  const params = useParams();
  const navigate = useNavigate();

  const [hits, setHits] = useState(null);
  const [subject, setSubject] = useState(null);
  const [manifest, setManifest] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (!params.subject) {
      setSubject(null);
    } else {
      setSubject(params.subject);
    }
    if (!params.manifest) {
      setManifest(null);
    } else {
      setManifest(params.manifest);
    }
  }, [params]);

  useEffect(() => {
    if (subject) {
      let q = subject;
      let url = `https://images-api.nasa.gov/search?q=${q}`;
      fetch(url)
        .then((res) => res.json())
        .then((d) => {
          let h = d.collection.metadata.total_hits;
          setHits(h);
        });
    }
  }, [subject]);

  useEffect(() => {
    if (hits) {
      let p = hits / 100 > 100 ? 100 : Math.ceil(hits / 100);
      let n = Math.floor(Math.random() * p) + 1;
      setPage(n);
    }
  }, [hits]);

  useEffect(() => {
    if (page && !manifest) {
      console.log(subject, page, manifest);
      let q = subject;
      let url = `https://images-api.nasa.gov/search?q=${q}&page=${page}`;
      fetch(url)
        .then((res) => res.json())
        .then((d) => {
          let pics = d.collection.items;
          pics = pics.filter(
            (pic) =>
              pic.data[0].center === "JPL" &&
              !pic.href.includes("video") &&
              !pic.href.includes("audio")
          );
          let n = Math.floor(Math.random() * pics.length);
          let pic = pics[n];

          if (!pic) {
            console.log("redirect");
            navigate("/space");
          } else {
            let man = pic.href;
            man = man.replace(/[/]/g, "%2F");
            man = man.replace(":", "%3A");
            setManifest(man);
            navigate(`/space/${subject}/${man}`);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [page, subject, manifest, navigate]);

  return <Outlet />;
}
