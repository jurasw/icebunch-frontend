import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Path } from "./pages/Paths";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPassword";
import IceCream from "./pages/IceCream";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Confirm from "./pages/Confirm";
import ConfirmRequest from "./pages/ConfirmRequest";
import Settings from "./pages/Settings";

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.ICE_CREAM} element={<IceCream />} />

        <Route path={Path.MY_PROFILE} element={<MyProfile />} />
        <Route path={Path.PROFILE} element={<Profile />} />
        <Route path={Path.CONFIRM_REQUEST} element={<ConfirmRequest />} />

        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.SETTINGS} element={<Settings />} />

        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.CONFIRM} element={<Confirm />} />
        <Route path={Path.FORGOT_PASSWORD} element={<ForgotPasswordForm />} />
        <Route path={Path.RESET_PASSWORD} element={<ResetPasswordForm />} />
      </Routes>
    </AnimatePresence>
  );
};
