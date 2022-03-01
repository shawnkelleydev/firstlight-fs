import { Outlet, useParams } from "react-router-dom";

export default function Tasks() {
  const params = useParams();

  return (
    <div className="Tasks">
      <p style={{ color: "yellow", paddingBottom: "16px" }}>
        ** under construction ** <br />
        doesn't work on mobile
      </p>
      {params.layout ? <Outlet /> : <h1>Please select a layout.</h1>}
    </div>
  );
}
