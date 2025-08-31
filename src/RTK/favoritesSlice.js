import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      if (index === -1) {
        state.push(id); // 없으면 추가
      } else {
        state.splice(index, 1); // 있으면 제거
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
