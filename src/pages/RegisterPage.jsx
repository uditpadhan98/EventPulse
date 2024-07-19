import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ProgressContext } from "./Layout";
import { BASE_URL } from "../Helper";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setProgress } = useContext(ProgressContext);
  const [loading, setLoading] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    setProgress(30);
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/register`, {
        name,
        club,
        email,
        password,
      });
      toast.success("Registration successful. Now you can log in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setProgress(100);
      setLoading(false);
      setRedirect(true);
    } catch (error) {
      setLoading(false);
      setProgress(100);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          toast.error(`Registration failed: ${data.error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          // setProgress(0);
          toast.error("Registration failed. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        }
      } else {
        // setProgress(0);
        toast.error(
          "Registration failed. Please check your network connection and try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          }
        );
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-6">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Incers"
            value={club}
            onChange={(ev) => setClub(ev.target.value)}
          />
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
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
