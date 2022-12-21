import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import { useAuth } from '../../../utils/context/authContext';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPostItem, setEditPostItem] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditPostItem);
  }, [id]);

  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm user={user} obj={editPostItem} />
    </div>
  );
}
