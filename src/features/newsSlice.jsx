import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsList: [],
  loading: true,
};

const API_KEY = "0f55890717eb4b2b8e5ffb860812586b";
export const getNews = createAsyncThunk("news/getNews", async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;
  try {
    const { data } = await axios(url);
    return data.articles;
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewsList: (state) => {
      state.newsList = [];
    },
    extraReducers: {
      [getNews.pending]: (state, action) => {
        state.loading = true;
      },
      [getNews.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.newsList = payload;
      },
      [getNews.rejected]: (state, { payload }) => {
        state.loading = false;
      },
    },
  },
});

// export const { setUser, clearUser } = authSlice.actions;

export default newsSlice.reducer;
