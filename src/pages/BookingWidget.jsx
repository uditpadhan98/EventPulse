import { useContext, useEffect, useState } from "react";
// import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function BookingWidget({ event }) {
  const [startDate, setStartDate] = useState("");
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
    const response = await axios.post("http://localhost:4000/api/bookings", {
      startDate,
      name,
      phone,
      event: event._id,
    });
    const bookingId = response.data._id;
    // setRedirect('/');
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Date :</label>
            <input
              type="date"
              value={startDate}
              onChange={(ev) => setStartDate(ev.target.value)}
            />
          </div>
        </div>
          <div className="py-3 px-4 border-t">
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
        Book this place
      </button>
    </div>
  );
}
