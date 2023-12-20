import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { logoutUser } from "../store/actions/user.actions";
import { Link } from "react-router-dom";
import { auth, signOut } from "../firebase";
import Plans from "../components/plans";

export default function Profile() {
  const user = useSelector((state) => state.userModule.loggedinUser);

  // async function onLogoutUser() {
  //   try {
  //     logoutUser();
  //     await signOut(auth);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="profile">
      <Nav />
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
              <Plans/>
              <button onClick={()=> signOut(auth)} className="profile-signout-btn">
                Sign Out
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}