import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditPost() {
  const [editPostItem, setEditPostItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(id).then(setEditPostItem);
  }, [id]);
  console.log(editPostItem);
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm obj={editPostItem} user={user.uid} categoryId={editPostItem.contegory?.id} />
    </div>
  );
}
