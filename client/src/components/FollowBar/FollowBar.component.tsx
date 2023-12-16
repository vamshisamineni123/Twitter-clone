import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar.component';
import useUser from '../../hooks/useUser.hook';
import useUsers from '../../hooks/useUsers.hook';
import { User } from '../../types/user.interface'
import { useNavigate } from 'react-router-dom';
import userId from '../../hooks/userId.hook';
import getFollowers from '../../hooks/getFollowers.hook';
import Header3 from '../Header3.component ';
import getFollowees from '../../hooks/getFollowees.hook';
const FollowBar: React.FC<{}> = () => {

  // const [allUsers, setAllUsers] = useState<User[]>([]);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [follows, setFollows] = useState<{ follower_id: string, followee_id: string }[]>([]);
  const [followees, setFollowees] = useState<string[] | null>(null);
  const allUsers = useUsers();
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/users/email/${email === null ? '' : email}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [email]);

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);
  useEffect(() => {
    const fetchFollows = async () => {
      const data = await getFollowers(id);
      const data1=await getFollowees(id);
      setFollows(data1);
      console.log('this is data in followbar component', data1)

      const followerIds = data.map((follow: any) => follow.follower_id);
      setFollowees(followerIds);
    };

    if (id) {
      fetchFollows();
    }
  }, [id,follows]);
  const handleClick = () => {
    navigate('/about');
  };
  

  const users = useUsers();
  const unfollowhandle = (fid: any) => {  
    fetch(`http://localhost:3002/users/${id}/unfollow/${fid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ followerId: id, followeeId: fid })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      //  navigate('/')
  }
  return (
    <div>
    <div className="px-6 py-4 hidden lg:block bg-white mb-2">
      <div className=" rounded-xl p-4 place-content-center">
        <div className="flex flex-col gap-6 ">
          {
            follows.filter((follow: { follower_id: string, followee_id: string }) => follow && follow.follower_id == id).map((follow: { follower_id: string, followee_id: string }) => {
              const user = allUsers.find((user) => user.id === follow.followee_id && user.id!==id);
              if (user) {
                return (
                  <div className='flex' key={(user.id)}>
                  <button key={user.id} onClick={handleClick}>
                    <div className="flex flex-row gap-4" >
                      <Avatar userid={user.id} />
                      <div className="flex flex-col">
                        <p className="font text-sm">{user.name}</p>
                        <p className=" text-sm text-blue-700 font-bold">@{user.username}</p>
                      </div>
                    </div>
                  </button>
                  <button className="text-blue-700 font-bold ml-2 mb-6" onClick={() => unfollowhandle(user.id)}>Unfollow
                    </button>
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    </div>
    <Header3/>
    <div className="px-6 py-4 hidden lg:block bg-white">
      <div className=" rounded-xl p-4 place-content-center">
        <div className="flex flex-col gap-6 ">
          {
           followees && followees.map((id) => {
            const user = allUsers.find((user: User) => user.id === id);
            if (user) {
              return (
                <button key={user.id} onClick={handleClick}>
                  <div className="flex flex-row gap-4" >
                    <Avatar userid={user.id} />
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className=" text-sm text-blue-700 font-bold">@{user.username}</p>
                    </div>
                  </div>
                </button>
              );
            }
          })
          }
        </div>
      </div>
    </div>
    
    </div>
  );
};


export default FollowBar;