import { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import SpaceLoading from "../SpaceLoading";

export default function SpaceSub() {
  const [subject, setSubject] = useState(null);
  const [hits, setHits] = useState(null);
  const [page, setPage] = useState(null);
  const [manifest, setManifest] = useState(null);
  const [active, setActive] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params) {
      setSubject(params.subject);
      if (params.manifest) {
        setManifest(params.manifest);
        setActive(false);
      } else {
        setActive(true);
      }
    }

    return () => setActive(false);
  }, [params]);

  useEffect(() => {
    if (subject && active) {
      let url = `https://images-api.nasa.gov//search?q=${subject}`;
      fetch(url)
        .then((res) => res.json())
        .then((d) => setHits(d.collection.metadata.total_hits))
        .catch((err) => console.error(err));
    }
  }, [subject, active]);

  useEffect(() => {
    if (hits && active) {
      let pages = hits / 100;
      pages = pages > 100 ? 100 : Math.ceil(pages);
      let n = Math.ceil(Math.random() * pages);
      setPage(n);
    }
  }, [hits, active]);

  useEffect(() => {
    if (page && subject && active) {
      let url = `https://images-api.nasa.gov//search?q=${subject}&page=${page}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let d = data;
          d = d.collection.items.filter(
            (item) =>
              !item.href.includes("audio") && !item.href.includes("video")
          );
          d = d.filter(
            (item) =>
              item.data[0].center &&
              item.data[0].center.toLowerCase().includes("jpl")
          );
          let n = Math.floor(Math.random() * d.length);
          d = d[n];
          if (d) {
            let man = d.href;
            setManifest(man);
          } else {
            setManifest(null);
            navigate("/space");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [page, subject, active, navigate]);

  useEffect(() => {
    if (manifest && active) {
      let man = manifest.replace(":", "%3A").replace(/[/]/g, "%2F");
      let route = `/space/${subject}/${man}`;
      navigate(route);
    }
  }, [manifest, subject, navigate, active]);

  return <>{manifest ? <Outlet /> : <SpaceLoading />}</>;
}
