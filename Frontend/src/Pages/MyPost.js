import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../component/index'
import appwriteService from "../appwrite/config";
import { useSelector} from 'react-redux';

function MyPost() {
    const userid = useSelector(status=>status.auth.userData.id);
    console.log(userid);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getMyPosts(userid).then((posts1)=>{
            if (posts1) {
                console.log(posts1.data);
                setPosts(posts1.data)
            }
        })}, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default MyPost