import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "Account",
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        } 
    },
});

export const { addItem } = accountSlice.actions;

export default accountSlice.reducer;