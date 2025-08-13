import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/Login";
import Logout from "./constant/Logout";
import SignupPage from "./pages/Signup";
// import HomePage from "./pages/HomePage";
import CreateBlog from "./pages/CreateBlog";
import { ProtectedRoutes } from "@/components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import BlogCards from "./pages/BlogCards";
import BlogPage from "@/pages/BlogPage";
// import { useAppSelector } from "./hooks/hooks";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<BlogCards />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs-viewer/:id" element={<BlogPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default App;
