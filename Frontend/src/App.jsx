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
import { useEffect, useState } from "react";
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

function App() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const isUserSub = useSelector((state) => state.userModule.isUserSub);

  const mobileMode = useSelector((state) => state.userModule.mobileMode);
  // const navigate = useNavigate();

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        loginUser({
          uid: userAuth.uid,
          email: userAuth.email,
        });
        loadUserSubs(userAuth.uid);
      } else {
        logoutUser();
      }
    });

    return unsbscribe;
  }, [auth.currentUser]);

  useEffect(() => {
    getMyListMovies();
  }, []);

  const updateScreenSize = () => {
    setMobileMode(window.innerWidth < 600);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

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

      if (!querySnapshot.empty) {
        querySnapshot.forEach((subscriptionDoc) => {
          const subscriptionData = subscriptionDoc.data();
          if (
            subscriptionData.current_period_start.seconds <=
              currentDateInSeconds &&
            subscriptionData.current_period_end.seconds >= currentDateInSeconds
          ) {
            console.log("yes");
            setUserSub("yes");
          } else {
            console.log("no1");
            setUserSub("no");
          }
        });
      } else {
        setUserSub("no");
        console.log("no2");
        console.log("User does not have any subscriptions.");
      }
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
              <Route
                path="/my-search"
                element={
                  <RouteGuard>
                    <MobileFilteredMovies />
                  </RouteGuard>
                }
              />

              <Route path="netflix-clone/profile" element={<Profile />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
