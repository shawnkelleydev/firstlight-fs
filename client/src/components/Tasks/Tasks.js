import { Outlet, useParams } from "react-router-dom";

export default function Tasks() {
  const params = useParams();

  return (
    <div className="Tasks">
      {params.layout ? <Outlet /> : <h1>Please select a layout.</h1>}
    </div>
  );
}
