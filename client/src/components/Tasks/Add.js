import AddBtn from "./AddBtn";
import Submit from "./Submit";

export default function Add(props) {
  return (
    <div className="Add">
      {props.add ? (
        <Submit
          cb={props.submit}
          input={props.input}
          setInput={props.setInput}
          warn={props.warn}
          label={props.label}
          class={props.class}
        />
      ) : null}
      <h2 className={props.showSubmit ? "h2-hide" : null}>add {props.label}</h2>
      <AddBtn add={props.add} cb={props.toggle} />
    </div>
  );
}
