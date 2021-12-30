export default function SignUp(props) {
  return (
    <div className="SignUp" style={{ backgroundImage: `url(${props.APOD})` }}>
      <form onSubmit={props.submit}>
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
        <p className="warning">
          Notice: user auth not yet available. Please try again soon!
        </p>
        <p className="toggle-signin" onClick={props.toggle}>
          or sign in here &rarr;
        </p>
      </form>
    </div>
  );
}
