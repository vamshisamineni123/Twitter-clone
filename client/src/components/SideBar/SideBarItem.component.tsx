import React from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';
interface SideBarItemProps {
   label:string;
   icon:IconType;
    href?:string;
    onClick?:() => void;
    auth?:boolean;
    alert?:boolean;

}

const MyComponent: React.FC<SideBarItemProps> = ({label,href,icon:Icon,alert,onClick}) => {
    return(
        <div onClick={onClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        
        hover:bg-opacity-10 
        cursor-pointer 
      
      ">
        <Icon size={28} color="black"/>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
       
       
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        {/* <Icon size={1} color="white" /> */}
        <p className="hidden lg:block text-xl">
          {label}
        </p>
        {/* {alert ? <BsDot className="text-sky-500 absolute -top-10 left+1" size={70} /> : null} */}
      </div>
    </div>
  );
}

export default MyComponent;
