import SpaceQuery from "./SpaceQuery";

export default function Warn() {
  return (
    <div className="Warn">
      <h1>No Results.</h1>
      <h2>Please try again.</h2>
      <SpaceQuery />
    </div>
  );
}
