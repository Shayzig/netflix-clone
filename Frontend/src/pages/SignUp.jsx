import React from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import { useForm } from "../customHooks/useForm";

export default function SignUp(props) {
  const [register, userAuth] = useForm(props.userAuth);

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        userAuth.email,
        userAuth.password
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sign-up">
      <form action="">
        <h1 className="signup-title">Sign In</h1>

        <input {...register("email")} placeholder="Email" />

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />

        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signup-gray">New to Netflix? </span>
          <span className="signup-link" onClick={onRegister}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
