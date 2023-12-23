import React from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  signInWithEmailAndPassword,
} from "../firebase";
import { useForm } from "../customHooks/useForm";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { setUserSub } from "../store/actions/user.actions";
import { useSelector } from "react-redux";

export default function SignUp(props) {
  const [register, userAuth] = useForm(props.userAuth);
  const user = useSelector((state) => state.userModule.loggedinUser);

  const navigate = useNavigate();

  const onRegister = async (e) => {
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
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password);
    } catch (error) {
      alert(error.message);
    }
  };

  async function loadUserSubs(userUid) {
    try {
      const subscriptionCollection = collection(
        db,
        "customers",
        userUid,
        "subscriptions"
      );

      const querySnapshot = await getDocs(subscriptionCollection);

      if (
        !querySnapshot.empty &&
        subscriptionData.current_period_start.seconds <= currentDateInSeconds &&
        subscriptionData.current_period_end.seconds >= currentDateInSeconds
      ) {
        const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);

        querySnapshot.forEach((subscriptionDoc) => {
          const subscriptionData = subscriptionDoc.data();

          setUserSub(true);
          navigate("/neflix-clone");
        });
      } else {
        setUserSub(false);
        navigate("/neflix-clone/profile");
        console.log("User does not have any subscriptions.");
      }
    } catch (error) {
      console.error("Error checking subscriptions:", error);
    }
  }

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
