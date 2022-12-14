import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../api/postData';
import PostsDetails from '../../components/Posts/PostDetails';

export default function PostsPage() {
  const [postDetail, setPostDetail] = useState();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setPostDetail);
  }, [id]);
  return (
    <div className="center-page">
      <PostsDetails key={id} postObj={postDetail} />
    </div>
  );
}
