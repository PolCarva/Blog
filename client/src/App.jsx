import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"


import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/admin/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Users from "./pages/admin/screens/users/Users";
import BlogPage from "./pages/blog/BlogPage";
import ProfileDetailPage from "./pages/profile/ProfileDetailPage";

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <div className="App font-opensans">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleDetailPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="comments" element={<Comments />} />
              <Route path="posts/manage" element={<ManagePosts />} />
              <Route path="posts/manage/edit/:slug" element={<EditPost />} />
              <Route path="categories/manage" element={<Categories />} />
              <Route path="categories/manage/edit/:slug" element={<EditCategories />} />
              <Route path="users/manage/" element={<Users />} />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </I18nextProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
