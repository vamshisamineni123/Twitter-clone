import React from 'react';
import SideBar from '../components/SideBar/SideBar.component';
import FollowBar from '../components/FollowBar/FollowBar.component';
import MiddleBar from '../components/MiddleBar/MiddleBar.component'
import Header1 from '../components/Header1.component';
type MyComponentProps = {
  children: React.ReactNode;
};

const MyComponent = () => {
  return (
    <div className="bg-bgtextcolor">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <div className='m-2 mt-3'><SideBar /></div>

          <div
            className="
              col-span-3 
              lg:col-span-2 x
              border-x-[1px] 
          ">
            <MiddleBar />
          </div>
          <div className='m-2 mt-3'>
            <div><Header1 /></div>
            <div><FollowBar /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComponent;
