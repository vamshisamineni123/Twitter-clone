import { useState, useEffect } from 'react';


//people you are following
const getFollowees = async(userid: any) => {
    const response = await fetch(`http://localhost:3002/users/${userid}/followees`);
  const follows = await response.json();
  return follows;
};

export default getFollowees;