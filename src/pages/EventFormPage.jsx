// import PhotosUploader from "./PhotosUploader.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function EventFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('http://localhost:4000/api/events/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveEvent(ev) {
    ev.preventDefault();
    const eventData = {
      title, address, addedPhotos,
      description,
      checkIn, checkOut
    };
    if (id) {
      // update
      await axios.put('http://localhost:4000/api/events', {
        id, ...eventData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('http://localhost:4000/api/events', eventData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/events'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveEvent}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {/* {preInput('Photos','more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}