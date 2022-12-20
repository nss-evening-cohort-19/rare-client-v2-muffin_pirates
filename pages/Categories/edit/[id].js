import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleCategory } from '../../../api/categoryData';
import CategoryForm from '../../../components/forms/CategoryForm';

export default function EditPost() {
  const [editCategory, setEditCategory] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCategory(id).then(setEditCategory);
  }, [id]);

  console.warn(editCategory);
  return (
    <div className="edit-cat-form" style={{ height: '45rem', padding: '10%' }}>
      <CategoryForm obj={editCategory.id} />
    </div>
  );
}
