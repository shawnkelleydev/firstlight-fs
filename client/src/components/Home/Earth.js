export default function Space(props) {
  return props.pic ? (
    <img
      src={props.pic}
      alt={`earth from nasa's DSCVR spacecraft on ${props.date}`}
    />
  ) : null;
}
