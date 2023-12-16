import React from 'react';
import SidebarItem from './SideBarItem.component';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SideBarLogo.component';
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetButton from './SideBarTweetButton.component';
import { useNavigate } from 'react-router-dom';
import { setRam } from '../../store/Postsreducer.slice';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/loginreducer.slice';

const SideBar = () => {
    const navigate = useNavigate();
    const handleClick1 = () => navigate('/');
    const handleClick3 = () => navigate('/about');
    const dispatch = useDispatch();
    const items = [
        {
            icon: BsHouseFill,
            label: 'Home',
            href: '/',
            alert: true,
            onClick: handleClick1,
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: '/notifications',
            alert: true,
        },
        {
            icon: FaUser,
            label: 'Profile',
            href: `/users/123`,
            alert: false,
            onClick: handleClick3,
        },
    ];
    const handleLogOut=()=>{
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className='col-span-1  pr-4 md:pr-6  bg-white' >
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px] mb-10">
                    <SidebarLogo/>
                    {items.map((item) => (
                        <SidebarItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            alert={item.alert}
                            onClick={item.onClick}
                        />
                    ))} 
                    <button onClick={handleLogOut}><SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" /></button>
        
                    {/* <button><SidebarTweetButton /></button> */}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
