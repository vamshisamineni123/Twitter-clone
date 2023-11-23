import { useState, useEffect } from 'react';

interface User {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
    bio?: string;
    follower_count: number;
    following_count: number;
    verified: boolean;
  }

const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3002/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  return user;
};

export default useUser;