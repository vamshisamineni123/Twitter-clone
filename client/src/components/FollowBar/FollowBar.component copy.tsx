import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar.component';
import useUser from '../../hooks/useUser.hook';
import useUsers from '../../hooks/useUsers.hook';
import { User } from '../../types/user.interface';
import { useNavigate } from 'react-router-dom';
import userId from '../../hooks/userId.hook';
import getFollowees from '../../hooks/getFollowees.hook';
interface Followee {
  follower_id: string;
  followee_id: string;
};
const FollowBarHome = () => {
  const email = localStorage.getItem('email');
  const user = userId(email === null ? '' : email);
  const allusers = useUsers();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [followees, setFollowees] = useState<Followee[]>([]);

  useEffect(() => {
    const fetchFollowees = async () => {
      if (user?.id) {
        const result = await getFollowees(user?.id);
        setFollowees(result);
      }
    };

    fetchFollowees();
  }, [followees,user?.id]);

  useEffect(() => {

    const usersNotFollowees = allusers.filter(
      (alluser: User) => !followees.find((followee) => followee?.followee_id === alluser.id)
    );
    setUsers(usersNotFollowees);
  }, [allusers, followees]);

  const followhandle = (event: React.MouseEvent,fid: any) => {
    // event.stopPropagation();
    fetch(`http://localhost:3002/users/${user?.id}/follow/${fid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ followerId: user?.id, followeeId: fid })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      navigate('/')
  }
 const profilenav = () => {
    navigate('/about')
  }
  return (
    <div className="px-6 py-4 hidden lg:block bg-white">
      <div className="rounded-xl p-4 place-content-center">
        <div className="flex flex-col gap-6 ">
          {
            users.filter(curuser => curuser.id !== user?.id).map((curuser: User) => (
              <div key={curuser.id} onClick={()=>{}}>
                <div className="flex flex-row gap-4">
                  <Avatar userid={curuser.id} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{curuser.name}</p>
                    <p className="text-sm text-blue-700 font-bold">@{curuser.username}</p>
                  </div>
                  <button className="text-blue-700 font-bold mb-6" onClick={(event) => followhandle(event,curuser.id)}>
                    Follow
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default FollowBarHome;
