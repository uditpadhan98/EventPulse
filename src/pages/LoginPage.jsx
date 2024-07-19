import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { toast } from "react-toastify";
import { ProgressContext } from "./Layout";
import { BASE_URL } from "../Helper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setProgress } = useContext(ProgressContext);
  const [loading, setLoading] = useState(false);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setProgress(30);
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      setUser(data);
      setProgress(100);
      toast.success("Logged-In successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // theme: "colored",
      });
      setRedirect(true);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        setProgress(100);
        const { status } = error.response;
        if (status === 404) {
          toast.error("Email not found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else if (status === 422) {
          // setProgress(0);
          toast.error("Password not correct", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else if (status === 500) {
          // setProgress(0);
          toast.error("Internal server error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else {
          // setProgress(0);
          toast.error("Login failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        }
      } else {
        // setProgress(0);
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: "colored",
        });
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-6">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            className={loading ? "primary cursor-not-allowed" : "primary"}
            disabled={loading}
          >
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
