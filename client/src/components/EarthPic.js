export default function EarthPic(props) {
  return (
    <div className="earth-pic-div">
      <img
        src={props.pic}
        className="earthPic"
        alt={`Earth on ${props.date}`}
      />
      <p className="citation">
        Image taken by NASA's DSCOVR spacecraft on {props.date}
      </p>
    </div>
  );
}
