export default function SignIn(props) {
  return (
    <div className="SignIn">
      <form onSubmit={props.submit}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" required={true} />
        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" required={true} />
        <button type="submit" className="submit">
          sign in
        </button>
        <p className="toggle-signin" onClick={props.toggle}>
          or sign up here &rarr;
        </p>
      </form>
    </div>
  );
}
