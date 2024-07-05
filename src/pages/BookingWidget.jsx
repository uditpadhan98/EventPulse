import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { toast } from "react-toastify";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";

export default function BookingWidget({ event }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisEvent() {
    setProgress(30);
    if (!user) {
      setProgress(0);
      toast.warn("Please log in first to book the event.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setRedirect("/login");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/bookings`, {
        name,
        phone,
        event: event._id,
      });

      const bookingId = response.data._id;
      setProgress(100);
      toast.success("Booked for this event successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      setProgress(100);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          toast.error("Unauthorized. Please log in.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else if (status === 400) {
          // setProgress(0);
          toast.error(`Bad request: ${data.error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else if (status === 500) {
          // setProgress(0);
          toast.error("Internal server error. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        } else {
          // setProgress(0);
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        }
      } else {
        // setProgress(0);
        toast.error("An error occurred. Please check your network connection and try again.", {
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
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="border rounded-2xl mt-4">
        <div className="py-3 px-4">
          <label>Your full name:</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Phone number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      </div>
      <button onClick={bookThisEvent} className="primary mt-4">
        Book this event
      </button>
    </div>
  );
}
