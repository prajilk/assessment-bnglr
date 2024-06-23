import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import queryConfig from "./config/react-query";
import PageLoading from "./components/common/page-loading";
import Error404 from "./components/common/error404";
import ProfileProvider from "./provider/profile-provider";
import Footer from "./components/footer/Footer";

const AllBlog = lazy(() => import("./pages/AllBlog"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const BlogRoute = lazy(() => import("./routes/Blog"));

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="App flex min-h-screen flex-col bg-muted">
        <QueryClientProvider client={queryClient}>
          <ProfileProvider>
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route path="/" element={<AllBlog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="blog/*" element={<BlogRoute />} />
              <Route path="/verifyEmail" element={<VerifyEmail />} />
            </Routes>
          </ProfileProvider>
        </QueryClientProvider>
        <Footer />
      </div>
      <Toaster position="bottom-right" />
    </Suspense>
  );
}

export default App;
