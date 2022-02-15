import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Space() {
  const navigate = useNavigate();
  const params = useParams();

  const [subject, setSubject] = useState(params.subject);

  useEffect(() => {
    if (!params.subject) {
      setSubject(null);
    } else {
      setSubject(params.subject);
    }
  }, [params]);

  useEffect(() => {
    if (!subject) {
      const subs = [
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune",
        "pluto",
        "juno",
        "black hole",
        "nebula",
        "black hole",
        "comet",
      ];
      let n = Math.floor(Math.random() * subs.length);
      let sub = subs[n];
      setSubject(sub);
      navigate(`/space/${sub}`);
    }
  }, [subject, navigate]);

  return (
    <div className="Space">
      <Outlet />
    </div>
  );
}
