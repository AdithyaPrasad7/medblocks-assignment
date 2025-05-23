import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import { isAuthenticated } from "./utils/auth";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!!isAuthenticated()) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/*"
        element={
          !!isAuthenticated() ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
