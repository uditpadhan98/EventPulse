import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("http://localhost:4000/api/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
          // console.log(booking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl mb-4">Your booking information:</h2>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div style={{ width: '70%' }}>
          <p className="text-3xl">{booking.event.title}</p>
          <p className="my-2 block">{booking.event.address}</p>
        </div>
        <div className="bg-slate-300 p-6 rounded-2xl font-bold" style={{ width: '30%' }}>
          <div>
            {new Date(booking.event.startDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <p>Time : {booking.event.time.hour} : {booking.event.time.minute}</p>
          <p>Organiser : {booking.event.organiser}</p>
        </div>
      </div>
    </div>
  );
}
