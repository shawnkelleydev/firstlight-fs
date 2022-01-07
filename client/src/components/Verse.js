import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { verses } from "./Verses";

export default function Verse() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location && location.search === "") {
      let n = Math.floor(Math.random() * verses.length);
      let verse = verses[n];
      navigate(`/verse/q?${verse}`, { replace: true });
    }
  }, [location, navigate]);

  return <Outlet />;
}
