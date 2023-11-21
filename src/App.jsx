import "./assets/scss/global.scss";
import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { onAuthStateChanged, auth } from "./firebase.js";
import { useEffect } from "react";
import { loginUser, logoutUser } from "./store/actions/user.actions";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector((state) => state.userModule.loggedinUser);

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

  return (
    <div className="app">
      <h1 style={{ color: "white" }}>hello{import.meta.env.VITE_CHECK} </h1>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
