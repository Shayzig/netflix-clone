import "./assets/scss/global.scss";
import "./assets/scss/basics/_typography.scss";
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { onAuthStateChanged, auth } from "./firebase.js";
import { useEffect } from "react";
import {
  loginUser,
  logoutUser,
  setMobileMode,
} from "./store/actions/user.actions";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import MyList from "./components/MyList";
import { getMyListMovies } from "./store/actions/movie.action";
import Nav from "./components/Nav";
import MobileFilteredMovies from "./components/MobileFilteredMovies";
import MobileNav from "./components/MobileNav";

function App() {
  const user = useSelector((state) => state.userModule.loggedinUser);
  const mobileMode = useSelector((state) => state.userModule.mobileMode);

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        loginUser({
          uid: userAuth.uid,
          email: userAuth.email,
        });
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

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            {mobileMode ? <MobileNav /> : <Nav />}
            <Routes>
              <Route path="netflix-clone" element={<HomeScreen />} />
              <Route path="netflix-clone/profile" element={<Profile />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/my-search" element={<MobileFilteredMovies />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
