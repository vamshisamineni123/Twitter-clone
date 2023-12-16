import { useState, useEffect } from 'react';

const getFollows = async(userid: any) => {
    const response = await fetch(`http://localhost:3002/users/${userid}/follows`);
  const follows = await response.json();
  console.log('final', follows)
  return follows;
};

export default getFollows;