export default function Submit(props) {
  // pass in label, cb, input, setInput, warn
  return (
    <>
      <form className={`Submit ${props.class}`} onSubmit={(e) => props.cb(e)}>
        <label htmlFor={props.label}>
          <span>{props.label}</span>
          <input
            type="text"
            value={props.input}
            onChange={(e) => props.setInput(e.target.value)}
          />
          {props.warn ? <span>Please check your input.</span> : null}
        </label>
        <button type="submit">+</button>
      </form>
    </>
  );
}
