import { configureStore } from '@reduxjs/toolkit';
import usersessionReducer from './usersession/usersessionsSlice';
import reservationsReducer from './reservations/reservationsSlice';
import boatsReducer from './boats/boatsSlice';
import boatDetailsReducer from './boatDetails/boatDetailsSlice';

const store = configureStore({
  reducer: {
    usersession: usersessionReducer,
    boats: boatsReducer,
    reservations: reservationsReducer,
    boatDetails: boatDetailsReducer,
  },
});

export default store;
