import React from 'react';
import Avatar from '../Avatar.component';
import useUser from '../../hooks/useUser.hook';
import useUsers from '../../hooks/useUsers.hook';
import { User } from '../../types/user.interface'
import { useNavigate } from 'react-router-dom';

const FollowBar: React.FC<{}> = () => {
  //const user=useUsers(1);
  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/about');
   
  };
  const users = useUsers();
  return (
    <div className="px-6 py-4 hidden lg:block bg-white">
      <div className=" rounded-xl p-4 place-content-center">
        {/* <h2 className="text-xl font-semibold">Who to follow</h2> */}
        <div className="flex flex-col gap-6 ">
          {users.map((user: User | null) => {
            if (!user) {
              return null;
            }
            return (
              <button onClick={handleClick}>
                <div key={user.id} className="flex flex-row gap-4" >
                  <Avatar userid={user.id} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className=" text-sm text-blue-700 font-bold">@{user.username}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default FollowBar;