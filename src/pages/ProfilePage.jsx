import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav.jsx";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("http://localhost:4000/api/logout");
    setRedirect("/");
    setUser(null);
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
