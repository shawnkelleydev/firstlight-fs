import { useState, useEffect } from "react";

export default function SignUp(props) {
  const [show, setShow] = useState(false);

  //reveal form on load
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <form
      onSubmit={props.submit}
      className={show ? "form show-in-place" : "conceal-below"}
    >
      <p className="copy">Get free, full-access to First Light!</p>
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
        required={true}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        required={true}
      />
      <label htmlFor="fName">first name</label>
      <input
        type="fName"
        id="fName"
        name="fName"
        value={props.fName}
        onChange={(e) => props.setFName(e.target.value)}
        required={true}
      />
      <button type="submit" className="submit">
        sign up
      </button>
    </form>
  );
}
