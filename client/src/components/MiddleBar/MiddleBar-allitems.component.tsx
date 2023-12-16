import React, { useEffect, useRef, useState } from 'react';
import Upload from './CreateTweet.component';
import CreateTweet from './CreateTweet.component';
import Tweet from './Tweet.component';
import {Post} from '../../Interfaces/posts.interface';
import { useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index.slice'
import { setPosts } from '../../store/Postsreducer.slice';
import userId from '../../hooks/userId.hook';
// import  {store}  from '../../store/index.slice'

const MiddleBarallitems = () => {
    // const [posts, setPosts] = useState<Post[]>([]);
    const dispatch = useDispatch();
    const posts:any=useSelector((state:RootState)=>state.posts.posts)
    const email=localStorage.getItem('email');

    const user=userId(email===null?'':email);
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    const id=user?.id;
    useEffect(() => {
        
            fetch(`http://localhost:3002/posts`)
                .then(response => response.json())
                .then(data => {
                    const filteredPosts = data;
                    localStorage.setItem('posts', JSON.stringify(filteredPosts));
                    dispatch(setPosts(filteredPosts));
                });
    }, [id]);
    return (
        <div>
           <div>

              {/* <CreateTweet /> */}
               {
                    posts.slice(-10).reverse().map((post:any, index:any) => (
                        <div key={post.id}>
                            <Tweet key={post.id} post={post} />
                        </div>
                    ))
                }
            </div>
        </div> 
    );
};

export default MiddleBarallitems;


