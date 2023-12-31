import React from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  signInWithEmailAndPassword,
} from "../firebase";
import { useForm } from "../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginSignUp({ userEmail, userMode, onSetUserMode }) {
  const [register, userAuth] = useForm(userEmail);
  const user = useSelector((state) => state.userModule.loggedinUser);

  const navigate = useNavigate();

  async function signIn(e, demoUser = null) {
    if (demoUser) {
      userAuth.email = `${demoUser}@gmail.com`;
      userAuth.password = "123456";
    }
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password);
    } catch (error) {
      alert(error.message);
    }
  }

  async function onRegister(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        userAuth.email,
        userAuth.password
      );
      navigate("/netflix-clone/profile");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="sign-up">
      <form
        onSubmit={
          userMode === "signUp" ? (e) => onRegister(e) : (e) => signIn(e)
        }
      >
        <h1 className="signup-title">
          {userMode === "signUp" ? "Sign up" : "Sign In"}
        </h1>

        <input {...register("email")} placeholder="Email" />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />

        {userMode === "signUp" ? (
          <button type="submit" onClick={(e) => onRegister(e)}>
            Sign Up
          </button>
        ) : (
          <>
            <button type="submit">Sign In</button>
            <button type="submit" onClick={(e) => signIn(e, "check")}>
              Quick Sign In
            </button>
          </>
        )}

        {userMode !== "signUp" && (
          <h4>
            <span className="signup-gray">New to Netflix? </span>
            <span
              className="signup-link"
              onClick={() => onSetUserMode("signUp")}
            >
              Sign Up now.
            </span>
          </h4>
        )}
      </form>
    </div>
  );
}
