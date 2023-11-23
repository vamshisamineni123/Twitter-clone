import React from 'react';
import useUser from '../hooks/useUser.hook'
interface Props {
    name: string;
}

const MyComponent= ({ userid }: { userid: string }) => {
  const user=useUser(userid)
    const fetchedUser:boolean=true;
    const hasBorder: boolean = true;
    const isLarge: boolean = false;

   const profileImage: string='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjyZcaLIYHVZ5TMs_dMmNTrl_qL80VXOIXXiw1jV07jzwlj7xoRqceDCAdxzK32yNNwch4O1bT1NHZvloci8MbxCfKAQO26-X9nzpCNNueylC5ZWj7KFvJlwkymTJQG4d6Kw8AJwuXV3Pk1Rqajz1_POtNb9UsLUbZvpzsZTIyvo9T6wDv36O1eenYn3w/s720/inhindi.co.in.jpg';
    return (
        <div
        className={`
          ${hasBorder ? 'border-4 border-black' : ''}
          ${isLarge ? 'h-32' : 'h-12'}
          ${isLarge ? 'w-32' : 'w-12'}
          rounded-full 
          hover:opacity-90 
          transition 
          cursor-pointer
          relative
        `}
      >
        <img
          
          style={{
            objectFit: 'cover',
            borderRadius: '100%'
          }}
          alt="Avatar"
          //onClick={() => console.log('Clicked!')}
          src={fetchedUser?user?.avatar:'/images/placeholder.png'}
        />
      </div>
    );
};

export default MyComponent;
