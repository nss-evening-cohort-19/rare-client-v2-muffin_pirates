import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCommentsByPost } from '../../api/commentData';
import CommentCard from '../../components/Comments/CommentCard';

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    getCommentsByPost(postId).then(setComments);
  }, [postId]);
  return (
    <div className="d-flex flex-wrap">
      {comments.map((comment) => (
        <CommentCard key={comment.id} commentObj={comment} onUpdate={getCommentsByPost} />
      ))}
    </div>
  );
}
