import React from 'react';
import PostForm from '../../components/forms/PostForm';

export default function NewPost() {
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PostForm />
    </div>
  );
}
