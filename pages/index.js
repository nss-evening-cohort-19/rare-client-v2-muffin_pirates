// import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getPosts } from '../api/postData';
import PostCard from '../components/Posts/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      <Link href="/Posts/new" passHref>
        <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">New Post</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}

export default Home;
