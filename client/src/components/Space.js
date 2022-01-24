import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Space(props) {
  // STATE
  const [subject, setSubject] = useState(null);
  // REACT ROUTER
  const navigate = useNavigate();
  const location = useLocation();

  // SET SUBJECT
  useEffect(() => {
    if (location.pathname === "/space") {
      let subjects = [
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune",
        "pluto",
        "nebula",
        "galaxy",
        "black hole",
        "comet",
      ];
      let n = Math.floor(Math.random() * subjects.length);
      let s = subjects[n];
      setSubject(s);
    }
  }, [location]);

  useEffect(() => {
    if (subject && location.pathname === "/space") {
      navigate(`/space/${subject}`);
    }
  }, [subject, navigate, location]);

  return (
    <div className="Space">
      <Outlet />
    </div>
  );
}
