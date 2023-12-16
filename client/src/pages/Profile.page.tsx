import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar/SideBar.component';
import MiddleBar from '../components/MiddleBar/MiddleBar.component'
import CreateTweet from '../components/MiddleBar/CreateTweet.component';
import Tweet from '../components/MiddleBar/Tweet.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index.slice';
import { setPosts } from '../store/Postsreducer.slice';
import Header2 from '../components/Header2.component';
import FollowBar from '../components/FollowBar/FollowBar.component';
import Header1 from '../components/Header1.component';
import userId from '../hooks/userId.hook'

const MyComponent = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts)
  const email = localStorage.getItem('email');
  const user = userId(email === null ? '' : email);
  const id = user?.id;
  const userPosts = posts.filter(post => post.author_id === id);

  return (
    <div className='bg-bgtextcolor'>
      <div className='w-full h-30 bg-red-600'>
        <img className='' src='https://via.placeholder.com/150' />
      </div>
      <div className='flex'>
        <div className='w-1/3 sticky top-0 h-screen'><SideBar /></div>
        <div className='col-span-3 overflow-y-auto h-screen'>
          {
            userPosts.map((post, index) => (
              <div key={post.id}>
                <Tweet post={post} />
              </div>
            ))
          }

          {/* <MiddleBar/> */}
        </div>
        <div className='sticky top-0 h-screen'>
          <div><Header2 /></div>
          <div><FollowBar /></div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;