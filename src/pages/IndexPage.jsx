import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function IndexPage() {
  const [events,setEvents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/events').then(response => {
      setEvents(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {events.length > 0 && events.map(events => (
        <Link to={'/events/'+events._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {events.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={events.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{events.address}</h2>
          <h3 className="text-sm text-gray-500">{events.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${events.checkIn}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}