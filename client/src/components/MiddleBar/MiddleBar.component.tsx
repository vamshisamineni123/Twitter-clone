import React, { useEffect, useState } from 'react';
import Upload from './CreateTweet.component';
import CreateTweet from './CreateTweet.component';
import Tweet from './Tweet.component';
import {Post} from '../../Interfaces/posts.interface';
import { useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/index.slice'
import { setPosts } from '../../store/Postsreducer.slice';
// import  {store}  from '../../store/index.slice'

const MyComponent = () => {
    // const [posts, setPosts] = useState<Post[]>([]);
    const dispatch = useDispatch();
    const posts=useSelector((state:RootState)=>state.posts.posts)
    useEffect(() => {
        fetch(`http://localhost:3002/posts/`)
            .then(response => response.json())
            .then(data => {
                dispatch(setPosts(data));
            });
    }, []);
    return (
        <div>
           <div>

              <CreateTweet />
               {
                    posts.map((post, index) => (
                        <div>
                            <Tweet key={post.id} post={post} />
                        </div>
                    ))
                }
            </div>
        </div> 
    );
};

export default MyComponent;
