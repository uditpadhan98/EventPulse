import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav.jsx";
import { toast } from "react-toastify";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const { setProgress } = useContext(ProgressContext);
  // console.log(user);

  async function logout() {
    setProgress(30);
    try {
      await axios.post(`${BASE_URL}/api/logout`);
      toast.success("Logged-out successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setProgress(100); // Complete progress
      setRedirect("/");
      setUser(null); // Clear user context
    } catch (error) {
      setProgress(0); // Reset progress on error
      // console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {
        <div className="text-center max-w-lg mx-auto">
          Logged in as
          <span className="font-bold"> {user.name} </span>({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      }
    </div>
  );
}
