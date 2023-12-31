import React, { useState } from "react";
import { useForm } from "../customHooks/useForm";

import LoginSignUp from "./LoginSignUp";

export default function Register() {
  const [showLoginSignUp, setShowLoginSignUp] = useState(false);
  const [register, userEmail] = useForm({
    email: "",
    password: "",
  });

  const [userMode, setUserMode] = useState(null);

  function handleLogin() {
    setShowLoginSignUp(true);
    setUserMode("login");
  }
  function handleSignUp() {
    setShowLoginSignUp(true);
    setUserMode("signUp");
  }

  return (
    <div className="login-container">
      <img
        className="logo"
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt=""
      />

      <button onClick={() => handleLogin()} className="login-btn">
        Sign In
      </button>

      <div className="gradient" />

      <div className="body">
        {showLoginSignUp ? (
          <LoginSignUp
            userEmail={userEmail}
            userMode={userMode}
            onSetUserMode={setUserMode}
          />
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
                  onClick={() => handleSignUp()}
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
