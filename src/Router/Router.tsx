import { useEffect } from "react";
import { Route, Routes as Switch, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { user } from "./User";

const Routes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
        navigate('/');
    }
  }, [navigate]);

  return (
    <Switch>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={<ProtectedRoute element={<Dashboard />} user={user} />}
      />
    </Switch>
  );
};

export default Routes;
