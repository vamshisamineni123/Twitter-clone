import { useState, useEffect } from 'react';


//people following you
const getFollowers = async(userid: any) => {
    const response = await fetch(`http://localhost:3002/users/${userid}/followers`);
  const follows = await response.json();
  // console.log('followers', follows)
  return follows;
};

export default getFollowers;