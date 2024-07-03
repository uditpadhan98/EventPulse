import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import UploadWidget from "../UploadWidget";

export default function EventFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [time, setTime] = useState({ hour: '', minute: ''});
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("http://localhost:4000/api/events/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setStartDate(data.startDate);
      setTime(data.time);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function handleTimeChange(ev) {
    const [hour, minute] = ev.target.value.split(":");
    setTime({ hour, minute });
  }
  
  function preInput(header, description) {
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
      title,
      address,
      addedPhotos,
      description,
      startDate,
      time,
    };
    console.log(eventData);
    if (id) {
      // update
      await axios.put("http://localhost:4000/api/events", {
        id,
        ...eventData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("http://localhost:4000/api/events", eventData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/events"} />;
  }

  return (
    <div>
      <AccountNav />
      {preInput("Photo", "upload image")}
      <UploadWidget
        uwConfig={{
          multiple: false,
          cloudName: "Udit98",
          uploadPreset: "CampusRecover",
          folder: "posts",
        }}
        setState={setAddedPhotos}
      />
      <form onSubmit={saveEvent}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput(
          "Start Date & Time",
          "add Start Date & Time, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Start Date</h3>
            <input
              type="date"
              value={startDate}
              onChange={(ev) => setStartDate(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Start Time</h3>
            <input
              type="time"
              value={`${time.hour}:${time.minute}`}
              onChange={handleTimeChange}
              placeholder="11"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
