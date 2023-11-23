import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Post} from '../Interfaces/posts.interface';
// interface Post {
//     id: string;
//     text: string;
//     author_id: string;
//     images: string;
//     like_count: number;
//     repost_count: number;
//     orig_post_id: string | null;
//     reply_to_id: string | null;
//     hashtags: string | null;
//     mentions: string | null;
//   }

interface PostsState {
    posts: Post[];
}

const initialState= {
    posts: [],
    ram:false,
    textareafocus:false,
    username:'',
    password:'',
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      increaseLikeCount: (state, action: PayloadAction<string>) => {
        const post = state.posts.find(post => post.id === action.payload);
        if(post)
          post.like_count++;
      },
      setPosts: (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
      },
      addPost: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      },
      setUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
      setPassword: (state, action: PayloadAction<string>) => {
        state.password = action.payload;
      },
      setRam: (state, action: PayloadAction<boolean>) => {
        state.ram = action.payload;
      },
    }, // This closing brace was missing
  });
  
  export const { increaseLikeCount, setPosts, setUsername, setPassword, setRam } = postsSlice.actions;
  
  export default postsSlice.reducer;