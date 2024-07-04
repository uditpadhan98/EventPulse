import {Link} from "react-router-dom";
import AccountNav from "./AccountNav";
import {useEffect, useState,useContext} from "react";
import axios from "axios";
import { ProgressContext } from './Layout';
import { BASE_URL } from "../Helper";

export default function EventsPage() {
  const [events,setEvents] = useState([]);
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    setProgress(30);
    axios.get(`${BASE_URL}/api/user-events`).then(({data}) => {
      setEvents(data);
      setProgress(100);
      // console.log(data);
    }).catch(() => {
      setProgress(0); // Reset progress on error
    });
  }, [setProgress]);
  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-black text-white py-2 px-6 rounded-full hover:bg-slate-500" to={'/account/events/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new events
          </Link>
        </div>
        <div className="mt-4 mb-4">
          {events.length > 0 ? events.map(events => (
            <Link to={'/account/events/'+events._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl m-4 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-[15rem]">
                <img src={events.photos} alt="place" />
              </div>
              <div className="">
                <h2 className="text-xl font-bold">{events.title}</h2>
                <p className="text-sm mt-2">
                {events.description.split(' ').slice(0, 30).join(' ') + (events.description.split(' ').length > 30 ? '...' : '')}
                </p>
                <div className="flex justify-between">
                <p className="text-sm mr-2 mt-2 font-bold">Date: {new Date(events.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sm mr-2 mt-2 font-bold">Time: {events.time.hour} : {events.time.minute}</p>
                </div>
              </div>
            </Link>
          )):(
            <p className="text-lg text-center col-span-2 md:col-span-3 lg:col-span-3">No events listed</p>
          )}
        </div>
    </div>
  );
}