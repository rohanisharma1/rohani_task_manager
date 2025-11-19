import Button from "./Button";
import { BiTask } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../redux/features/auth/authSlice";
import { apiClient } from "../helper";

const logoutUser = async () => {
  const { data } = await apiClient.post("/auth/logout");
  return data;
};

const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.auth.userInfo);

  const isLoginPage = window.location.pathname === "/login";
  const isSignupPage = window.location.pathname === "/signup";

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());
      queryClient.setQueryData(["user"]);
      toast.success("Logout successful");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    },
  });

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-slate-100">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="flex items-center gap-2">
            <BiTask className="text-3xl" />
            <span className="text-2xl font-semibold tracking-wide">
              Task Manager
            </span>
          </Link>
        </div>

        <div className="flex gap-3">
          {!userinfo?.user?.email ? (
            <>
              <Link to={"/login"}>
                <Button
                  bgColor={
                    isLoginPage
                      ? "bg-white"
                      : "bg-transparent border border-white/30 hover:border-emerald-400 hover:bg-white/5"
                  }
                  textColor={
                    isLoginPage ? "text-slate-900" : "text-slate-100"
                  }
                  className="rounded-full px-6"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button
                  bgColor={
                    isSignupPage
                      ? "bg-white"
                      : "bg-emerald-500/90 hover:bg-emerald-400"
                  }
                  textColor={
                    isSignupPage ? "text-slate-900" : "text-white"
                  }
                  className="rounded-full px-6"
                >
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Button
              onClick={() => mutation.mutate()}
              bgColor="bg-rose-500 hover:bg-rose-400"
              className="rounded-full px-6"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
