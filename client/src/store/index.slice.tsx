import { configureStore } from "@reduxjs/toolkit";
import PostsreducerSlice from "./Postsreducer.slice";
// import rootReducer from "./reducers/contactsReducer.js"
// const store = configureStore({
//   reducer: rootReducer,
// });
const store = configureStore({
  reducer: {
    posts: PostsreducerSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;