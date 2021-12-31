import { useState, useEffect } from "react";

export default function SignIn(props) {
  const [show, setShow] = useState(false);

  //reveal form on load
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <form
      onSubmit={props.submit}
      className={show ? "form" : "form form-conceal-below"}
    >
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        name="email"
        required={true}
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={props.password}
        required={true}
        onChange={(e) => props.setPassword(e.target.value)}
      />
      <button type="submit" className="submit">
        sign in
      </button>
    </form>
  );
}
