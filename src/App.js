import { Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import EventFormPage from './pages/EventFormPage';
import IndexPage from './pages/IndexPage';
import EventPage from './pages/EventPage';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';

axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/events" element={<EventsPage />} />
          <Route path="/account/events/:id" element={<EventFormPage />} />
          <Route path="/account/events/new" element={<EventFormPage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
