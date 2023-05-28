import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Path } from "./pages/Paths";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPassword";
import IceCream from "./pages/IceCream";

export const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.ICE_CREAM} element={<IceCream />} />
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.FORGOT} element={<ForgotPasswordForm />} />
        <Route path={Path.RESET} element={<ResetPasswordForm />} />
      </Routes>
    </AnimatePresence>
  );
};
