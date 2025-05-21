import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/log" replace />
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
