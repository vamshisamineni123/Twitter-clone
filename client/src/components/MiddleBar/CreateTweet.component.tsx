import React, { useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { useRef } from 'react';
import { useState } from 'react';
import { setPosts } from '../../store/Postsreducer.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index.slice';


const CreateTweet = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [TweetText, setTweetText] = useState<string>('');
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const focusTextarea = useSelector((state:RootState) => state.posts.textareafocus);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
   // replace with rereelector

useEffect(() => {
  if (focusTextarea && textAreaRef.current) {
    textAreaRef.current.focus();
  }
}, [focusTextarea]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(event.target.value);
  };

  const handleTweet = async () => {
    const tweetData = {
      text: TweetText,
      author_id: "bd6684ae-abb9-4555-833a-c7da174b15ed",
      images: [image ? URL.createObjectURL(image) : "ram here"], // Assuming 'image' is the URL of the image
    };

    const response = await fetch('http://localhost:3002/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData),
    });
    if (response.ok) {
      const newPost = await response.json();
      dispatch(setPosts([...posts, newPost]));
      TweetText && setTweetText('');
      image && setImage(null);
    } else {
      console.error('Error posting tweet:', response);
    }
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      setImage(file);
      console.log(formData);
      // Rest of your code...
      const response = await fetch(`http://localhost:3002/users/upload`, {
        method: 'POST',
        body: formData,
      });
      console.log('i am fucked');

      if (!response.ok) {
        // Handle error
        console.log(response)
        console.error('File upload failed');
        return;
      }
      else
        console.log(response)
      // File uploaded successfully
      const data = await response.json();
      console.log('File uploaded:', data);
    }
  };

  return (
    <div className='flex-col h-1/4 border border-gray-300 p-4 rounded-3xl m-3 bg-white'>
      <div>Tweet something</div>
      <div className="border"></div>
      <div className="flex pt-2">
        <div className='w-1/12 mr-2'>
          <img src='/createTweet.png' className='rounded-2xl' ></img>
        </div>
        <textarea ref={textAreaRef} className="w-full h-24 outline-none"  value={TweetText} placeholder="What's happening?" onChange={handleTextChange}> </textarea>
      </div>
      <div className='flex'>
        <div className='w-1/12'></div>
        <div className='w-11/12 p-1'>
          {image && <img src={URL.createObjectURL(image)} alt="Selected" />}
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='mr-4 text-blue-500 ml-10'>
          <ImageIcon onClick={handleImageClick} />
          <input type="file" ref={fileInput} className="hidden" onChange={handleFileChange} />
        </div>
        <a href='www.google.com' className="text-blue-400">Everyone can reply</a>
        <div className='ml-14'>
          <button onClick={handleTweet} className='text-blue-500 font-bold '>Tweet</button>
        </div>
      </div>

    </div>
  );
};

export default CreateTweet;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

