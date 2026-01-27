import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/app/api";

const productSlice = createSlice({
  name: "product",
  initialState: { total: 1000 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.countProducts.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        //state.total = payload.total;
      },
    );
  },
});

export default productSlice.reducer;
