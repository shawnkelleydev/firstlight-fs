import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { verses } from "../data/Verses";

export default function VerseOutlet() {
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    if (!params.passage) {
      let v = verses;
      let n = v.length;
      n = Math.floor(Math.random() * n);
      v = v[n];
      navigate(`/verse/${v}`);
    }
  }, [params, navigate]);

  return <Outlet />;
}
