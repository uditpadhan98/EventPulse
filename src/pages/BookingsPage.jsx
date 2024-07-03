import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
// import PlaceImg from "../PlaceImg";
// import {differenceInCalendarDays, format} from "date-fns";
import { Link } from "react-router-dom";
// import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bookings');
        setBookings(response.data);
        console.log(bookings.length);
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
              to={`/account/bookings/${booking._id}`}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl m-4 overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="w-[15rem]">
                <img src={bookings.event.photos[0]} alt="place" />
              </div>
              <div className="">
                <h2 className="text-xl font-bold">{bookings.event.title}</h2>
                <p className="text-sm mt-2">
                  {bookings.event.description.split(" ").slice(0, 30).join(" ") +
                    (bookings.event.description.split(" ").length > 30 ? "..." : "")}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm mr-2 mt-2 font-bold">
                    Date:{" "}
                    {new Date(bookings.event.startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm mr-2 mt-2 font-bold">
                    Time: {bookings.event.time.hour} : {bookings.event.time.minute}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-lg text-center col-span-2 md:col-span-3 lg:col-span-3">
            No booking found
          </p>
        )}
      </div>
    </div>
  );
}
