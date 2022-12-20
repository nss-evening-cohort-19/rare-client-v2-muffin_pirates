import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleComment } from '../../api/commentData';
import CommentCard from '../../components/Comments/CommentCard';

export default function CommentsPage() {
  const [comments, setComments] = useState();
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    getSingleComment(postId).then(setComments);
  }, [postId]);
  console.log(comments);
  return (
    <div className="d-flex flex-wrap">
      {comments.map((comment) => (
        <CommentCard commentObj={comment} onUpdate={getSingleComment} />
      ))}
    </div>
  );
}
