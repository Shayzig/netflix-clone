import React, { useRef, useState } from "react";
import SignUp from "./SignUp";
import { useForm } from "../customHooks/useForm";

export default function Login() {
  const [signIn, setSignIn] = useState(false);
  const [register, userAuth, setUserAuth] = useForm({
    email: "",
    password: "",
  });

  return (
    <div className="login-container">
      <img
        className="logo"
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt=""
      />

      <button onClick={() => setSignIn(true)} className="login-btn">
        Sign In
      </button>

      <div className="gradient" />

      <div className="body">
        {signIn ? (
          <SignUp userAuth={userAuth} />
        ) : (
          <>
            <h1 className="login-title">
              Unlimited films, TV programmes and more.
            </h1>

            <h2>Watch anywhere. Cancel at any time.</h2>

            <h3>
              Ready to watch? Enter your email to create or restart your
              membership
            </h3>

            <div className="login-input">
              <form>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Adress"
                />

                <button
                  onClick={() => setSignIn(true)}
                  className="get-started-btn"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
