import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Login";
import Logout from "./constant/Logout";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import { ProtectedRoutes } from "@/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

const App = () => {
  const users = localStorage.getItem("authToken");
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes user={users}>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
