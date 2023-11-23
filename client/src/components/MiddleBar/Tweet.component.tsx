import React, { useState,useEffect } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { increaseLikeCount } from '../../store/Postsreducer.slice';
import { RootState } from '../../store/index.slice';
const Tweet = ({ post }) => {

    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
      };
    // const [tweet, setTweet] = React.useState(post);
    // const tweet=useSelector((state :RootState)=>state.posts.posts)
    // console.log('tweet bugga ',tweet);
    const handleLikeClick = async () => {
        handleLike();
        // const updatedTweet = {
        //     ...tweet,
        //     like_count: Number(tweet.like_count) + 1
        // };
        // console.log(tweet.id);
        const response = await fetch(`http://localhost:3002/posts/${post.id}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            console.error('Failed to update likes_count');
        } else {
            dispatch(increaseLikeCount(post.id))
            console.log(response)
        }
    };

    // useEffect(() => {
    //    // handleLikeClick();
    //     // setTweet(post);
    // }, [tweet]);
    return (
        <div className="m-3 rounded-3xl bg-white ">
            <div className='flex p-2'>
                <img src="/createTweet.png" alt="profile" className='w-12 rounded-2xl mr-2' />
                <div>
                    <div className='text-base'>vamshisamineni3@gmail.com</div>
                    <div className='text-xs'>20 October at 2:42</div>
                </div>
            </div>
            <div className='base mb-1 p-2'>{post.text}</div>
            <div className='p-2'>
                <img src="img.png" alt="profile" className='h-64 w-full' />
            </div>
            <div className='flex mx-15'>
                <div className='w-3/4'></div>
                <div className='flex mr-2 ml-14'>
                    <div className='text-gray-300 text-xs'>
                        0
                    </div>
                    <div className='text-gray-300 text-xs'>
                        Comments
                    </div>
                </div>
                <div className='flex mr-2'>
                    <div className='text-gray-300 text-xs'>
                        {post.like_count}
                    </div>
                    <div className='text-gray-300 text-xs'>
                    <button onClick={handleLike}>Likes</button>
                    </div>
                </div>
                <div className='flex mr-2'>
                    <div className='text-gray-300 text-xs'>
                        0
                    </div>
                    <div className='text-gray-300 text-xs'>
                        Saved
                    </div>
                </div>
            </div>
            <hr className='my-2' />
            <div className='flex ml-4'>
                <div className='flex mr-16'>
                    <div className='text-xs'>
                        <MessageIcon />

                    </div>
                    <div className='text-base'>
                        <button className="cursor-pointer">Comment</button>
                    </div>

                </div>
                <div className='flex mr-16'>
                    <div className='text-sm'>
                        <ReplayIcon />
                    </div>
                    <div className='text-sm'>
                        <button className="cursor-pointer" onClick={() => console.log('Retweets button clicked')}>Retweets</button>
                    </div>
                </div>
                <div className='flex mr-16'>
                <div className={`text-xs ${isLiked ? 'text-red-500' : 'text-gray-300'}`}>
                        <FavoriteBorderIcon />
                    </div>
                    <div className='text-sm'>
                        <button className="cursor-pointer" onClick={handleLikeClick}>Like</button>
                    </div>

                </div>
                <div className='flex'>
                    <div className='text-sm'>
                        <SaveIcon />
                    </div>
                    <div className='text-sm'>
                        <button className="cursor-pointer">Save</button>
                    </div>
                </div>
            </div>
            <hr className='mt-2' />
            <br />
            <div className='flex h-7 mb-4 ml-2 mr-2'>
                <img src="/createTweet.png" alt="profile" className='rounded-xl  mr-4' />
                <textarea className="w-full mr-2 outline-none" placeholder="What's happening?" />
                <div>
                    <SendIcon />
                </div>
            </div>
        </div>
    );
};



export default Tweet;