import Card from "./Card";

export default function Lists(props) {
  return (
    <div className="Lists">
      <div>
        <h2>Priority</h2>
        {props.list.length > 0
          ? props.list
              .filter((item) => item.star)
              .map((item, i) => <Card key={i} item={item} />)
          : null}
      </div>
      <div>
        <h2>Tasks</h2>
        {props.list.length > 0
          ? props.list.map((item, i) => <Card key={i} item={item} />)
          : null}
      </div>
    </div>
  );
}
