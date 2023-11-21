import React, { useRef } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sign-up">
      <form action="">
        <h1 className="signup-title">Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signup-gray">New to Netflix? </span>
          <span className="signup-link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
