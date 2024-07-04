import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bookings');
        setBookings(response.data);
        // console.log(response.data); 
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Link
              key={booking._id} // Adding key prop to avoid React warnings
              to={`/account/bookings/${booking._id}`}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl m-4 overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="w-[15rem]">
                <img src={booking.event.photos[0]} alt="place" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{booking.event.title}</h2>
                <p className="text-sm mt-2">
                  {booking.event.description.split(" ").slice(0, 30).join(" ") +
                    (booking.event.description.split(" ").length > 30 ? "..." : "")}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm mr-2 mt-2 font-bold">
                    Date:{" "}
                    {new Date(booking.event.startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm mr-2 mt-2 font-bold">
                    Time: {booking.event.time.hour} : {booking.event.time.minute}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-lg text-center col-span-2 md:col-span-3 lg:col-span-3">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
}
