import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import { isAuthenticated } from "./utils/auth";

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/login"
        element={!!isAuthenticated() ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/home"
        element={!!isAuthenticated() ? <Home /> : <Navigate to="/login" />}
      />
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
