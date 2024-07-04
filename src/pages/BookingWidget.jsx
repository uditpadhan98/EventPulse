import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function BookingWidget({ event }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisEvent() {
    if (!user) {
      alert("Please log in first to book the event.");
      setRedirect("/login");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/bookings", {
        name,
        phone,
        event: event._id,
      });

      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          alert("Unauthorized. Please log in.");
        } else if (status === 400) {
          alert(`Bad request: ${data.error}`);
        } else if (status === 500) {
          alert("Internal server error. Please try again later.");
        } else {
          alert("An error occurred. Please try again.");
        }
      } else {
        alert(
          "An error occurred. Please check your network connection and try again."
        );
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
