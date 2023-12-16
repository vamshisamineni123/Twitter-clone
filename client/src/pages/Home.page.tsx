import React from 'react';
import SideBar from '../components/SideBar/SideBar.component';
import FollowBar from '../components/FollowBar/FollowBar.component';
import MiddleBar from '../components/MiddleBar/MiddleBar.component'
import Header1 from '../components/Header1.component';
import CreateTweet from '../components/MiddleBar/CreateTweet.component';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index.slice';
import Tweet from '../components/MiddleBar/Tweet.component';
import MiddleBarallitems from '../components/MiddleBar/MiddleBar-allitems.component';
import FollowBarHome from '../components/FollowBar/FollowBar.component copy'

const MyComponent = () => {
  // const posts = useSelector((state: RootState) => state.posts.posts)
  return (
    <div className="bg-bgtextcolor">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <div className='m-2 mt-3 sticky top-0 h-screen'><SideBar /></div>
          <div className='flex flex-col col-span-2'>
            <div className="col-span-3 lg:col-span-2 x border-x-[1px]">
              <CreateTweet />
            </div >
            <div className="col-span-3 lg:col-span-2 x border-x-[1px] overflow-y-auto h-screen">
              <MiddleBarallitems />
            </div>
          </div>
          <div className='m-2 mt-3 sticky top-0 h-screen'>
            <div><Header1 /></div>
            <div><FollowBarHome /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComponent;