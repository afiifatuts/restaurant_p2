//to handle cart element we use redux
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    //quantity is in the cart icon
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      //update state total
      state.products.push(action.payload);
      //this is qty in cart
      state.quantity += 1;
      //this is total price
      state.total += action.payload.price * action.payload.quantity;
    },
    //when we clik payment then back to initial state again
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
