import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";

export default function EventPage() {
  const { id } = useParams();
  const [events, setEvents] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:4000/api/events/${id}`).then((response) => {
      setEvents(response.data);
    });
  }, [id]);

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
          </p>
        </div>
        <div>
          <BookingWidget event={events} />
        </div>
      </div>
    </div>
  );
}
