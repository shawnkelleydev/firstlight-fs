import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verses } from "./Verses";

export default function Home() {
  const params = useParams();
  const navigate = useNavigate();

  //VOD intial fire
  useEffect(() => {
    let verse = params.verse;
    if (verse) {
      navigate(`/verse/${verse}`, { replace: true });
    } else {
      let n = Math.floor(Math.random() * verses.length);
      verse = verses[n];
      navigate(`/verse/${verse}`, { replace: true });
    }
  }, [params, navigate]);

  return <Outlet />;
}
