import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPostItem, setEditPostItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditPostItem);
  }, [id]);

  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm obj={editPostItem} />
    </div>
  );
}
