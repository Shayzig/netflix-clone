import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";

import { useForm } from "../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function LoginSignUp({ userEmail, userMode, setUserMode }) {
  const [register, userAuth] = useForm(userEmail);
  const [isUserAuthError, setIsUserAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userModule.loggedinUser);
  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  const navigate = useNavigate();

  async function signIn(e, demoUser = null) {
    setIsUserAuthError(null);
    setIsLoading(true);
    e.preventDefault();
    try {
      if (demoUser) {
        userAuth.email = `${demoUser}@gmail.com`;
        userAuth.password = "123456";
      }
      await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password);
    } catch (error) {
      console.log(error);
      setIsUserAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsUserAuthError(null);
    try {
      setTimeout(async () => {
        await createUserWithEmailAndPassword(
          auth,
          userAuth.email,
          userAuth.password
        );
        setIsLoading(false);
        if (mobileMode) {
          navigate("/mobile-profile");
        } else {
          navigate("/profile");
        }
      }, 2000);
    } catch (error) {
      setIsUserAuthError(error.message);
    }
  }

  function onSetUserMode(userMode) {
    setIsUserAuthError(false);
    setUserMode(userMode);
  }

  function getError() {
    const errorList = {
      invalidEmail: isUserAuthError.match(/invalid-email/gi),
      invalidUserAuth: isUserAuthError.match(/invalid-login-credentials/gi),
      emailInUsed: isUserAuthError.match(/email-already-in-use/gi),
      invalidPasswordLength: isUserAuthError.match(/weak-password/gi),
      noPasswordEntered: isUserAuthError.match(/missing-password/gi),
    };

    switch (true) {
      case errorList.invalidEmail !== null:
        return `Please enter valid email.`;
      case errorList.invalidUserAuth !== null:
        return `Sorry, password or email is incorrect.`;
      case errorList.invalidPasswordLength !== null:
        return `Password should be at least 6 characters.`;
      case errorList.noPasswordEntered !== null:
        return `Please enter a password.`;

      default:
        return "Please try again later";
    }
  }

  return (
    <>
      <div className="sign-up">
        <form
          onSubmit={
            userMode === "signUp" ? (e) => onRegister(e) : (e) => signIn(e)
          }
        >
          {isUserAuthError && (
            <div className="user-auth-modal">{getError()}</div>
          )}
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
            <>
              {!isLoading ? (
                <button type="submit" onClick={(e) => onRegister(e)}>
                  Sign Up
                </button>
              ) : (
                <button className="loading">
                  <Loader />
                </button>
              )}
            </>
          ) : (
            <>
              {!isLoading ? (
                <button type="submit">Sign In</button>
              ) : (
                <button className="loading">
                  <Loader />
                </button>
              )}

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
    </>
  );
}
