//dep
import { useState } from "react";

//children
import EarthPic from "./EarthPic";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
//component
export default function Auth(props) {
  const [signIn, setSignIn] = useState(true);
  return (
    <div className="Auth">
      <EarthPic pic={props.pic} date={props.date} />
      <div className="SignIn">
        {signIn ? (
          <SignIn
            submit={props.signIn}
            setEmail={props.setEmail}
            setPassword={props.setPassword}
            email={props.email}
            password={props.password}
          />
        ) : (
          <SignUp
            submit={props.signUp}
            setEmail={props.setEmail}
            setPassword={props.setPassword}
            setFName={props.setFName}
            email={props.email}
            password={props.password}
            fName={props.fName}
          />
        )}
        {signIn ? (
          <p className="toggle-signin" onClick={() => setSignIn(!signIn)}>
            ...or sign up here! &rarr;
          </p>
        ) : (
          <p className="toggle-signin" onClick={() => setSignIn(!signIn)}>
            Already registered? Sign in here! &rarr;
          </p>
        )}
        <p className="warning">Notice: user auth not yet available.</p>
      </div>
    </div>
  );
}
