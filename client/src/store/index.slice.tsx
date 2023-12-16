import { configureStore } from "@reduxjs/toolkit";
import PostsreducerSlice from "./Postsreducer.slice";
import loginReducer from "./loginreducer.slice"; // import the login reducer

const store = configureStore({
  reducer: {
    posts: PostsreducerSlice,
    login: loginReducer // add the login reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;