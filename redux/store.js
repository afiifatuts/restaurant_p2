import { configureStore } from "@reduxjs/toolkit";
//import card reducer
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    //and then card would be cartReducer
    cart: cartReducer,
  },
});
