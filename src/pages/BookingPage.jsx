import { useParams } from "react-router-dom";
import { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { ProgressContext } from './Layout';
import { toast } from 'react-toastify';
import { BASE_URL } from "../Helper";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    const fetchBooking = async () => {
      if (id) {
        setProgress(30); // Start loading
        try {
          const response = await axios.get(`${BASE_URL}/api/bookings`);
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
            setProgress(100); // Loading complete
          } else {
            setProgress(100); // Reset progress
            toast.error("Booking not found.", {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              // theme: "colored",
            });
          }
        } catch (error) {
          setProgress(100); // Reset progress
          toast.error("Error fetching booking. Please try again later.", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            // theme: "colored",
          });
        }
      }
    };

    fetchBooking();
  }, [id, setProgress]);

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
