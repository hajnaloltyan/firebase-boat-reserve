import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Boats from './components/pages/Boats';
import BoatDetails from './components/pages/BoatDetails';
import MyReservations from './components/pages/MyReservations';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Reserve from './components/pages/Reserve';
import DeleteBoat from './components/pages/DeleteBoat';
import AddBoat from './components/pages/AddBoat';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/boats" />} />
        <Route path="boats" element={<Boats />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="my-reservations" element={<MyReservations />} />
        <Route path="/delete-boat" element={<DeleteBoat />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="boats/:id" element={<BoatDetails />} />
        <Route path="add-boat" element={<AddBoat />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
