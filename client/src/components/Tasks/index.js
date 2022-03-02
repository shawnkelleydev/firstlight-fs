import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function Tasks() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="Tasks">
      <p className="caution">
        ** under construction ** <br />
        kaban doesn't work on mobile
      </p>
      <button
        className="reset"
        onClick={() => {
          localStorage.clear();
          navigate("/tasks/kanban");
        }}
      >
        reset
      </button>
      {params.layout ? <Outlet /> : <h1>Please select a layout.</h1>}
    </div>
  );
}
