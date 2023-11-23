import React from 'react';
import SideBar from './SideBar/SideBar.component';
import FollowBar from './FollowBar/FollowBar.component';
type MyComponentProps = {
  children:React.ReactNode;
};

const MyComponent: React.FC<MyComponentProps> = ({children}) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <SideBar />
          <div 
            className="
              col-span-3 
              lg:col-span-2 x
              border-x-[1px] 
              border-neutral-800
          ">
            {children}
          </div>
          <FollowBar />
        </div>
     </div>
    </div>
  )
}

export default MyComponent;
