import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  boatDetails: [],
  isLoading: false,
  error: null,
  message: null,
};

export const getBoatDetails = createAsyncThunk(
  'boatDetails/getBoatDetails',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/boats/${id}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const boatDetailsSlice = createSlice({
  name: 'boatDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoatDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBoatDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boatDetails = action.payload;
    });
    builder.addCase(getBoatDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default boatDetailsSlice.reducer;
