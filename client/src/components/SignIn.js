export default function SignIn(props) {
  console.log(props.APOD);
  return (
    <div className="SignIn" style={{ backgroundImage: `url(${props.APOD})` }}>
      <form onSubmit={props.submit}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" required={true} />
        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" required={true} />
        <button type="submit" className="submit">
          sign in
        </button>
        <p className="warning">
          Notice: user auth not yet available. Please try again soon!
        </p>
        <p className="toggle-signin" onClick={props.toggle}>
          or sign up here &rarr;
        </p>
      </form>
    </div>
  );
}
