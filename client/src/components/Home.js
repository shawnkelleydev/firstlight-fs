import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verses } from "./Verses";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  //VOD intial fire
  useEffect(() => {
    if (location) {
      let q = location.search;
      if (q && q !== "") {
        console.log(true);
        q = q.replace("?", "");
        navigate(`/verse/q?${q}`, { replace: true });
      } else {
        let verse;
        let n = Math.floor(Math.random() * verses.length);
        verse = verses[n];
        navigate(`/verse/q?${verse}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return <Outlet />;
}
