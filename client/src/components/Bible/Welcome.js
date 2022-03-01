import QueryBible from "./QueryBible";

export default function Welcome() {
  return (
    <div className="Welcome">
      {/* .Welcome is the full screen, .Welcome-caption is the part in the middle */}
      <div className="Welcome-caption">
        <h1>Welcome to the Bible!</h1>
        <QueryBible />
      </div>
    </div>
  );
}
