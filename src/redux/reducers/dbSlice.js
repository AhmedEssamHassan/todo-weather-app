import { createSlice } from "@reduxjs/toolkit";
import formattedDateTime from "../../utiles/dateFormater";
const dbSlice = createSlice({
  name: "db",
  initialState: {
    data: [],
  },
  reducers: {
    ADD_DATA: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    MARK_AS_COMPLETED: (state, action) => {
      const { selectedRows } = action.payload;
      state.data = state.data.map((row) => ({
        ...row,
        completed: selectedRows?.includes(row.id) ? true : false,
        finishedAt: selectedRows?.includes(row.id)
          ? formattedDateTime()
          : "Not finished yet",
      }));
    },
  },
});

export const { ADD_DATA, MARK_AS_COMPLETED } = dbSlice.actions;
export default dbSlice.reducer;
