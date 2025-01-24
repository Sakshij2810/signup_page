import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        userData
      );
      return response.data; // Response after successful signup
    } catch (error) {
      return rejectWithValue(error.response.data); // Error response
    }
  }
);

const initialState = {
  user: null,
  otpRequired: false,
  loading: false,
  error: null,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
      state.otpRequired = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
        state.otpRequired = action.payload.otpRequired;
        state.message = "Signup successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setMessage, resetUser } = userSlice.actions;

export default userSlice.reducer;
