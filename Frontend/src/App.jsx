import "./assets/scss/global.scss";
import "./assets/scss/basics/_typography.scss";
import HomeScreen from "./pages/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { onAuthStateChanged, auth } from "./firebase.js";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  setMobileMode,
  setUserSub,
} from "./store/actions/user.actions";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import MyList from "./components/MyList";
import { getMyListMovies } from "./store/actions/movie.action";
import Nav from "./components/Nav";
import MobileFilteredMovies from "./components/MobileFilteredMovies";
import MobileNav from "./components/MobileNav";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffectUpdate } from "./customHooks/useEffectUpdate";
import MobileFooter from "./components/MobileFooter";
import MobileProfile from "./components/MobileProfile";

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
      loadUserSubs(user.uid);
    }
  }, [user]);

  async function loadUserSubs(userUid) {
    try {
      const subscriptionCollection = collection(
        db,
        "customers",
        userUid,
        "subscriptions"
      );

      const querySnapshot = await getDocs(subscriptionCollection);

      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);

      if (querySnapshot.empty) return setUserSub("no");

      querySnapshot.forEach((subscriptionDoc) => {
        const subscriptionData = subscriptionDoc.data();
        if (
          subscriptionData.current_period_start.seconds <=
            currentDateInSeconds &&
          subscriptionData.current_period_end.seconds >= currentDateInSeconds
        ) {
          setUserSub("yes");
        } else {
          setUserSub("no");
        }
      });
    } catch (error) {
      console.error("Error checking subscriptions:", error);
    }
  }

  function RouteGuard({ children }) {
    if (isUserSub === "no") return <Navigate to="/netflix-clone/profile" />;
    return <>{children}</>;
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
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
              {/* Mobile */}
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
