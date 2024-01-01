import React from "react";
import Plans from "../components/plans";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth, signOut } from "../firebase";

export default function Profile() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const navigate = useNavigate();

  function onSignOut() {
    signOut(auth);
    navigate("/netflix-clone");
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
              <button
                onClick={() => onSignOut()}
                className="profile-signout-btn"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
