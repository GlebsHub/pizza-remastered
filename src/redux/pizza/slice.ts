import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";

import { Pizza, PizzaSliceState, Status } from "./types";


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, 
};


const pizzaSlice = createSlice({
    name: '[pizza]',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },


    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
      });


      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      });

      builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        state.status = Status.ERROR;
      });


    },
        

    // extraReducers: {
    //     [fetchPizzas.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         console.log(action, 'fulfilled')
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         console.log(action, 'rejected')
    //         state.items = [];
    //         state.status = 'error';
    //     },
    // },
});


export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;  