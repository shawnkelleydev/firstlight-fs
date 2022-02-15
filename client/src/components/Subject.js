import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading";
import Warn from "./Warn";

export default function Subject() {
  const params = useParams();
  const navigate = useNavigate();

  const [hits, setHits] = useState(null);
  const [subject, setSubject] = useState(params.subject);
  const [manifest, setManifest] = useState(params.manifest);
  const [page, setPage] = useState(null);

  const [warn, setWarn] = useState(false);

  // prevent fetch on unmount
  useEffect(() => {
    return () => {
      setSubject(null);
      setHits(null);
      setManifest(null);
      setPage(null);
    };
  }, []);

  useEffect(() => {
    if (!params.subject) {
      setSubject(null);
      setPage(null);
      setManifest(null);
    } else if (!params.manifest) {
      setSubject(params.subject);
      setManifest(null);
      setPage(null);
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
    if (hits && hits > 0) {
      let p = hits / 100 > 100 ? 100 : Math.ceil(hits / 100);
      let n = Math.floor(Math.random() * p) + 1;
      setPage(n);
      setWarn(false);
    } else if (hits === 0) {
      setWarn(true);
    }
  }, [hits]);

  useEffect(() => {
    if (page && !manifest && subject) {
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
          if (!pic && hits > 1000) {
            setSubject(null); // allows repeat queries
            setPage(null);
            setHits(null);
            navigate(`/space/${q}`);
          } else if (!pic) {
            navigate("/space");
          } else {
            let man = pic.href;
            man = man.replace(/[/]/g, "%2F");
            man = man.replace(":", "%3A");
            setManifest(man);
            setSubject(null); // allows repeat queries
            setPage(null);
            setHits(null);

            navigate(`/space/${subject}/${man}`);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [page, subject, hits, manifest, navigate]);

  return manifest ? <Outlet /> : warn ? <Warn /> : <Loading />;
}
