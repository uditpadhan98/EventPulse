import { useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";
import { toast } from "react-toastify";

export default function EventPage() {
  const { id } = useParams();
  const [events, setEvents] = useState(null);
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    if (!id) {
      return;
    }
    setProgress(30);
    axios.get(`${BASE_URL}/api/events/${id}`).then((response) => {
      setEvents(response.data);
      setProgress(100);
      // console.log(response.data);
    }).catch(() => {
      setProgress(100); // Reset progress on error
      toast.error("Please check your network connection and try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // theme: "colored",
      });
    });
  }, [id,setProgress]);

  if (!events) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{events.title}</h1>
      <p>{events.address}</p>
      <p events={events} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {events.description}
          </div>

          <p className="font-bold">
            Date:{" "}
            {new Date(events.startDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-bold">
            Time: {events.time.hour} : {events.time.minute}
          </p >
          <p className="font-bold"> Organiser : {events.organiser}</p>
        </div>
        <div>
          <BookingWidget event={events} />
        </div>
      </div>
    </div>
  );
}
