import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './reservations/reservationsSlice';
import boatsReducer from './boats/boatsSlice';
import boatDetailsReducer from './boatDetails/boatDetailsSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    boats: boatsReducer,
    reservations: reservationsReducer,
    boatDetails: boatDetailsReducer,
    user: userReducer,
  },
});

export default store;
