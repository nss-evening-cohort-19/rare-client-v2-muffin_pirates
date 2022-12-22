import React from 'react';
import { useAuth } from '../../utils/context/authContext';
import CategoryForm from '../../components/forms/CategoryForm';

export default function NewCategory() {
  const { user } = useAuth();
  // console.warn(user);
  return (
    <div className="create-cat-form" style={{ height: '45rem', padding: '10%' }}>
      <CategoryForm user={user} />
    </div>
  );
}
