import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface TypedData {
  _id: number;
  title: string;
  image: string;
  iframe: string;
  filtres: string;
}

interface InitialState {
  data: TypedData[];
  loading: boolean;
  error: boolean;
}

interface TypeEditData {
  id: number;
  title: string;
  image: string;
  iframe: string;
  filtres: string;
}
interface TypeNewData {
  filtres: string;
  title: string;
  image: string;
  iframe: string;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: false,
};

const link =
  "https://api.elchocrud.pro/api/v1/5045605199ae115d97ff0523b50c1311/YouTube_Movie";

export const postRequest = createAsyncThunk(
  "movie/postMovies",
  async (newData: TypeNewData) => {
    try {
      const response = await axios.post(link, newData);
      return response.data;
    } catch (error) {
      console.error("Error in postRequest:", error);
      throw error;
    }
  }
);

export const getRequest = createAsyncThunk("movie/getMovies", async () => {
  try {
    const response = await axios.get(link);
    return response.data;
  } catch (error) {
    console.error("Error in getRequest:", error);
    throw error;
  }
});

export const deleteRequest = createAsyncThunk(
  "movie/deleteMovies",
  async (id: number) => {
    try {
      await axios.delete(`${link}/${id}`);
      return id;
    } catch (error) {
      console.error("Error in deleteRequest:", error);
      throw error;
    }
  }
);

export const upDateData = createAsyncThunk(
  "movie/editMovie",
  async ({ id, title, image, iframe }: TypeEditData) => {
    try {
      await axios.patch(`${link}/${id}`, {
        title,
        image,
        iframe,
      });
      return {
        id,
        title,
        image,
        iframe,
      };
    } catch (error) {
      console.error("Error in upDateData:", error);
      throw error;
    }
  }
);

const youTubeSlice = createSlice({
  name: "YouTube",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRequest.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(postRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(upDateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(upDateData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedData = state.data.find(
          (item) => item._id === action.payload.id
        );
        if (updatedData) {
          updatedData.title = action.payload.title;
          updatedData.image = action.payload.image;
          updatedData.iframe = action.payload.iframe;
        }
      })
      .addCase(upDateData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const reducerMovie = youTubeSlice.reducer;
