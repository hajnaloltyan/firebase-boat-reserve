import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,
  message: null,
};

export const getUserLogin = createAsyncThunk(
  'usersession/getUserLogin',
  async (name, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { user: name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem('user', JSON.stringify(response.data.status.data.user));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserSignup = createAsyncThunk(
  'usersession/getUserSignup',
  async (name, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/signup',
        { user: name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'usersession/logoutUser',
  async () => {
    localStorage.removeItem('user');
    return { message: 'Logged out successfully.' };
  },
);

const usersessionSlice = createSlice({
  name: 'usersession',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.status.data.user;
        state.message = action.payload.status.message;
      })
      .addCase(getUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.payload.status.message;
      })
      .addCase(getUserSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.payload.status.message;
      })
      .addCase(getUserSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.payload.status.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.message = action.payload.message;
      });
  },
});

export default usersessionSlice.reducer;

export const selectUser = (state) => state.usersession.user;
export const selectIsLoading = (state) => state.usersession.isLoading;
export const selectError = (state) => state.usersession.error;
export const selectMessage = (state) => state.usersession.message;

export const { clearMessage } = usersessionSlice.actions;
