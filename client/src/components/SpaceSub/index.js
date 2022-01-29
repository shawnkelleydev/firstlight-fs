import { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import SpaceLoading from "../SpaceLoading";

export default function SpaceSub() {
  const [subject, setSubject] = useState(null);
  const [hits, setHits] = useState(null);
  const [page, setPage] = useState(null);
  const [manifest, setManifest] = useState(null);
  const [active, setActive] = useState(false);
  //
  const [query, setQuery] = useState(null);
  const [reset, setReset] = useState(false);
  // using reset effect to avoid unecessary calls to nasa api
  //
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // removes previous query, allowing functionality if query is the same
    setQuery(null);
    setPage(null);
    setHits(null);
    if (params) {
      setSubject(params.subject);
      // checks for preexisting manifest
      if (params.manifest) {
        setManifest(params.manifest);
      } else {
        setActive(true);
        setManifest(null);
      }
    }

    return () => setActive(false);
  }, [params]);

  useEffect(() => {
    if (subject && active) {
      let url = `https://images-api.nasa.gov/search?q=${subject}`;

      fetch(url)
        .then((res) => res.json())
        .then((d) => setHits(d.collection.metadata.total_hits))
        .catch((err) => console.error(err));
    }
  }, [subject, active]);

  useEffect(() => {
    if (hits && active && !page) {
      let pages = hits / 100;
      pages = pages > 100 ? 100 : Math.ceil(pages);

      let n = Math.ceil(Math.random() * pages);
      setPage(n);
    }
  }, [hits, active, page]);

  useEffect(() => {
    if (page && subject && active) {
      let q = `https://images-api.nasa.gov/search?q=${subject}&page=${page}`;

      setQuery(q);
    }
  }, [page, subject, active]);

  useEffect(() => {
    if (query) {
      let url = query;
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

            setActive(false);
          } else {
            setManifest(null);

            setReset(true);
            setPage(null);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  // reset navigation in seperate effect to avoid multiple unnecessary calls to api
  // conditional actions based on hits (low hit searches redirected to new topic)
  useEffect(() => {
    if (reset && hits > 10) {
      navigate(`/space/${subject}`);
      setReset(false);
    } else if (reset) {
      navigate(`/space`);
      setReset(false);
    }
  }, [reset, subject, hits, navigate]);

  useEffect(() => {
    if (manifest && active) {
      let man = manifest.replace(":", "%3A").replace(/[/]/g, "%2F");
      let route = `/space/${subject}/${man}`;
      navigate(route);
    }
  }, [manifest, subject, navigate, active]);

  return <>{manifest ? <Outlet /> : <SpaceLoading />}</>;
}
