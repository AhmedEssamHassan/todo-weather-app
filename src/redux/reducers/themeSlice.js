import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
  },
  reducers: {
    TOGGLe_ThEME: (state, action) => {
      state.mode = action.payload == true ? "dark" : "light";
    },
  },
});

export const { TOGGLe_ThEME } = themeSlice.actions;
export default themeSlice.reducer;
