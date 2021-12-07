import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params } from "../services/github";

const initialState: Params = {
  sort: "name",
  order: "asc",
  page: 1,
  per_page: 5,
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<Params["order"]>) => {
      state.order = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemPerPage: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload;
    },
  },
});

export const { setSortBy, setOrder, setPageNo, setItemPerPage } = githubSlice.actions
export default githubSlice.reducer;
