import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/404";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./redux/app/appSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/common/Loader";
import { getMe } from "./redux/app/appThunks";
import GenericLanding from "./components/common/GenericLanding";
import TherapistDashboard from "./pages/therapist/TherapistDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const isLoading = useSelector((state) => state.app.isInitialized);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) dispatch(getMe());
    else dispatch(initializeApp());
  }, [dispatch]);

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  const PatientRoute = ({ children }) => {
    return user && user.role === "PATIENT" ? children : <Navigate to="/" />;
  };

  const TherapistRoute = ({ children }) => {
    return user && user.role === "CLINIC_ADMIN" ? children : <Navigate to="/" />;
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
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/resetPassword/confirm/"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard Page={GenericLanding} />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/clinic_admin"
          element={
            <TherapistRoute>
              <Dashboard Page={TherapistDashboard} />
            </TherapistRoute>
          }
        />
        <Route
          path="/dashboard/patient"
          element={
            <PatientRoute>
              <Dashboard Page={PatientDashboard} />
            </PatientRoute>
          }
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
