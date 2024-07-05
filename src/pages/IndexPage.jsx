import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const { setProgress } = useContext(ProgressContext);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/api/events").then((response) => {
  //     setEvents(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setProgress(30); // Start loading
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);
        setEvents(response.data);
        setProgress(100); // Loading complete
      } catch (error) {
        setProgress(100); // Reset progress on error
        toast.error("Error fetching events. Please try again later.", {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // theme: "colored",
        });
      }
    };

    fetchEvents();
  }, [setProgress]);

  return (
    <>
      <HomePage />
      <hr className="mb-4" />
      <h1 className="flex justify-center text-4xl font-bold">Listed Events</h1>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {events.length > 0 ?
          events.map((events) => (
            <Link
              to={"/events/" + events._id}
              className="bg-[#f1efef] p-6 rounded-xl transition transform duration-200 hover:shadow-lg hover:scale-105"
            >
              <div className="bg-gray-500 mb-2 rounded-2xl flex h1">
                {events.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={events.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{events.title}</h2>
              <h3 className="text-sm text-gray-500">{events.address}</h3>
              <div className="mt-1">
                <span className="font-bold">{new Date(events.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </Link>
          )):(
            <p className="text-lg text-center col-span-2 md:col-span-3 lg:col-span-3">No events listed</p>
          )}
      </div>
      <Footer />
    </>
  );
}
