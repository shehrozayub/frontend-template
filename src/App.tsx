import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./redux/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/common/Loader";
import { getMe } from "./redux/auth/authThunks";
import GenericLanding from "./components/common/GenericLanding";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { AppDispatch, RootState } from "./redux/store";
import { User } from "./models/auth";
import UserDashboard from "./pages/user/UserDashboard";
import { StringConstants, UrlPaths, UserRoles } from "./services/constants/constantsService";

function App() {

  const dispatch: AppDispatch = useDispatch();
  const user: User | null = useSelector((state: RootState) => state.auth.user);
  const isLoading : boolean = useSelector((state:RootState) => state.auth.isInitialized);

  useEffect(() => {
    if (localStorage.getItem(StringConstants.localStorageKeys.accessToken)) dispatch(getMe());
    else dispatch(initializeApp());
  }, [dispatch]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      setShouldNavigate(true);
    }
  }, [user]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate(`/dashboard/${String(user?.role).toLowerCase()}`);
      setShouldNavigate(false); // Reset flag after navigation
    }
  }, [shouldNavigate, navigate, user]);

  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return user ? children : <Navigate to="/"  />
  };

  const UserRoute = ({ children }) => {
    return user && user.role === UserRoles.USER ? children : <Navigate to="/" />;
  };

  const AdminRoute = ({ children }) => {
    return user && user.role === UserRoles.ADMIN ? (
      children
    ) : (
      <Navigate to={UrlPaths.ROOT} />
    );
  };

  const PublicRoute = ({ children }) => {
    return user ? (
      <Navigate to={`/dashboard/${String(user.role).toLowerCase()}`} />
    ) : (
      children
    );
  };
  if (!isLoading) return <Loader />;

  return (
    <>
      <Routes>
        <Route
          path={UrlPaths.ROOT}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path={UrlPaths.FORGOT_PASSWORD}
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path={UrlPaths.RESET_PASSWORD}
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path={UrlPaths.DASHBOARD}
          element={
            <PrivateRoute>
              <Dashboard Page={GenericLanding} />
            </PrivateRoute>
          }
        />
        <Route
          path={UrlPaths.ADMIN_DASHBOARD}
          element={
            <AdminRoute>
              <Dashboard Page={AdminDashboard} />
            </AdminRoute>
          }
        />
        <Route
          path={UrlPaths.USER_DASHBOARD}
          element={
            <UserRoute>
              <Dashboard Page={UserDashboard} />
            </UserRoute>
          }
        />

        <Route path={UrlPaths.ANY} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
