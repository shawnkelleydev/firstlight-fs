import { useNavigate, useParams } from "react-router-dom";

export default function LayoutMenu() {
  const navigate = useNavigate();

  const params = useParams();

  function go(place) {
    navigate(`/tasks/${place}`);
  }

  const options = ["kanban", "lists"];

  return (
    <div className="LayoutMenu">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => go(opt)}
          className={params.layout === opt ? "active" : null}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
