import React, { useState } from "react";
import Plans from "../components/plans";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth, signOut } from "../firebase";
import Loader from "../components/Loader";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userModule.loggedinUser);
  const navigate = useNavigate();

  function onSignOut() {
    setIsLoading(true);
    setTimeout(() => {
      signOut(auth);
      setIsLoading(false);
      navigate("/");
    }, 2000);
  }

  return (
    <div className="profile">
      <div className="profile-body">
        <h1>Edit Profile</h1>

        <div className="profile-info">
          <img
            src="https://media.tenor.com/sgQ73oidu1wAAAAC/netflix-avatar-smile.gif"
            alt="avatar"
          />

          <div className="profile-details">
            <h2>{user.email}</h2>
            <div className="profile-plans">
              <h3>Plans</h3>
              <Plans />
              {isLoading ? (
                <button className="profile-signout-btn loading">
                  <Loader />
                </button>
              ) : (
                <button
                  onClick={() => onSignOut()}
                  className="profile-signout-btn"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
