import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import CreateBlog from "../pages/CreateBlog";
import ProtectedRoute from "../components/protected-route";
import EditBlog from "../pages/EditBlog";
import MyBlog from "../pages/MyBlog";

const AllBlog = lazy(() => import("../pages/AllBlog"));
const Blog = lazy(() => import("../pages/Blog"));

const BlogRoute = () => {
  return (
    <Routes>
      <Route index element={<AllBlog />} />
      {/* Protect private route from Unauthorized Users */}
      <Route path="create" element={<ProtectedRoute />}>
        <Route index element={<CreateBlog />} />
      </Route>

      {/* Protect private route from Unauthorized Users */}
      <Route path="edit/:id" element={<ProtectedRoute />}>
        <Route index element={<EditBlog />} />
      </Route>

      {/* Protect private route from Unauthorized Users */}
      <Route path="my-blog" element={<ProtectedRoute />}>
        <Route index element={<MyBlog />} />
      </Route>

      <Route path=":id" element={<Blog />} />
    </Routes>
  );
};

export default BlogRoute;
