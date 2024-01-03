import "./assets/scss/global.scss";
import "./assets/scss/basics/_typography.scss";
import HomeScreen from "./pages/HomeScreen";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyList from "./components/MyList";
import Nav from "./components/Nav";

// Mobile only
import MobileNav from "./components/MobileNav";
import MobileFooter from "./components/MobileFooter";
import MobileProfile from "./components/MobileProfile";
import MobileFilteredMovies from "./components/MobileFilteredMovies";
// hellosadsa
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Firebase
import { db } from "./firebase";
import { onAuthStateChanged, auth } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

import { useEffect, useLayoutEffect } from "react";
import { useEffectUpdate } from "./customHooks/useEffectUpdate";
import { useWindowSize } from "@uidotdev/usehooks";

import { useSelector } from "react-redux";
import { getMyListMovies } from "./store/actions/movie.action";
import {
  loginUser,
  logoutUser,
  setIsUserSub,
  setMobileMode,
} from "./store/actions/user.actions";

function App() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const isUserSub = useSelector((state) => state.userModule.isUserSub);

  const size = useWindowSize();

  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  useLayoutEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        loginUser({
          uid: userAuth.uid,
          email: userAuth.email,
        });
      } else {
        logoutUser();
      }
      return unsbscribe;
    });
  }, [auth.currentUser]);

  useEffect(() => {
    getMyListMovies();
  }, []);

  useEffect(() => {
    if (size.width < 600) {
      setMobileMode(true);
    } else {
      setMobileMode(false);
    }
  }, [size]);

  useEffectUpdate(() => {
    if (user) {
      checkUserSubs(user.uid);
    }
  }, [user]);

  async function checkUserSubs(userUid) {
    try {
      const subscriptionCollection = collection(
        db,
        "customers",
        userUid,
        "subscriptions"
      );

      const querySnapshot = await getDocs(subscriptionCollection);

      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);

      if (querySnapshot.empty) return setIsUserSub(false);

      querySnapshot.forEach((subscriptionDoc) => {
        const subscriptionData = subscriptionDoc.data();
        if (
          subscriptionData.current_period_start.seconds <=
            currentDateInSeconds &&
          subscriptionData.current_period_end.seconds >= currentDateInSeconds
        ) {
          setIsUserSub(true);
        } else {
          setIsUserSub(false);
        }
      });
    } catch (error) {
      console.error("Error checking subscriptions:", error);
    }
  }

  function RouteGuard({ children }) {
    if (!isUserSub && isUserSub !== null)
      return <Navigate to="/netflix-clone/profile" />;
    return <>{children}</>;
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Register />
        ) : (
          <>
            {mobileMode ? <MobileNav /> : <Nav />}
            <Routes>
              <Route
                path="netflix-clone"
                element={
                  <RouteGuard>
                    <HomeScreen />
                  </RouteGuard>
                }
              />
              <Route
                path="/my-list"
                element={
                  <RouteGuard>
                    <MyList />
                  </RouteGuard>
                }
              />
              <Route path="netflix-clone/profile" element={<Profile />} />

              {/* Mobile Routes*/}
              <Route
                path="/my-search"
                element={
                  <RouteGuard>
                    <MobileFilteredMovies />
                  </RouteGuard>
                }
              />
              <Route
                path="netflix-clone/mobile-profile"
                element={
                  <RouteGuard>
                    <MobileProfile />
                  </RouteGuard>
                }
              />
            </Routes>
            {mobileMode && <MobileFooter />}
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
