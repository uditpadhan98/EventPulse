import AccountNav from "./AccountNav";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    const fetchBookings = async () => {
      setProgress(30);
      try {
        const response = await axios.get(`${BASE_URL}/api/bookings`,{
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setBookings(response.data);
        setProgress(100);
        // console.log(response.data); 
      } catch (error) {
        setProgress(100);
        toast.error('Error fetching bookings. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: 'colored',
        });
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
