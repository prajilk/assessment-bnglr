import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { setAuth } from "../../redux/authSlice";
import Sidebar from "./Sidebar";
import { Show } from "../common/show";

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-4xl py-5 md:py-10">
      <nav className="mx-2 flex items-center justify-between rounded-lg bg-white px-5 py-3 shadow lg:mx-0">
        <Link to="/" className="text-2xl font-bold">
          Simple Blog
        </Link>

        {/* Navigation for larger devices */}
        <div className="hidden items-center gap-2 md:flex">
          <NavItems />
        </div>

        {/* Navigation for smaller devices */}
        <div className="md:hidden">
          <Sidebar>
            <NavItems />
          </Sidebar>
        </div>
      </nav>
    </header>
  );
}

const NavItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem("token"); // Remove token from localStorage when logout
    dispatch(setAuth(false)); // Set auth state false when user logout, Redux
    toast.success("Logout successfully");
    navigate("/");
  }

  const { user: isAuthenticated } = useSelector((state) => state.auth); // Getting auth status from "auth" redux state
  return (
    <Show>
      <Show.When isTrue={isAuthenticated}>
        <Button className={"flex items-center gap-2"}>
          <Plus size={15} />
          <Link to="/blog/create">Create new post</Link>
        </Button>
        <Button variant="link">
          <Link to="/blog/my-blog">My Blog</Link>
        </Button>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Show.When>
      <Show.Else>
        <Button variant="link">
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="link">
          <Link to="/register">Register</Link>
        </Button>
      </Show.Else>
    </Show>
  );
};
