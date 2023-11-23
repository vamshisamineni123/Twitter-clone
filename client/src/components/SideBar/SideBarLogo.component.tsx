import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { useNavigate} from 'react-router-dom';

const SidebarLogo: React.FC = () => {
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/');
    // };
  
  return (
    <div 
      onClick={()=>{}}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;