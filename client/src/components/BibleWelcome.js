export default function BibleWelcome(props) {
  return (
    <div className="BibleWelcome">
      <img
        src={props.APOD}
        alt="nasa astronmy picture of the day"
        className="APOD"
      />
      <p className="citation">{props.APODtitle}, courtesy of NASA APOD.</p>
      <p className="welcome">Welcome to the Bible</p>
    </div>
  );
}
