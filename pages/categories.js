import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import CategoryCard from '../components/Categories/CategoryCard';
import { getCategories } from '../api/categoryData';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <>
      <Link href="/Categories/new" passHref>
        <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Create Category</Button>
      </Link>
      <article className="category">
        <h1>Categories</h1>
        {categories.map((category) => (
          <section key={`category--${category.id}`} className="category">
            <CategoryCard id={category.id} label={category.label} onUpdate={getCategories} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Categories;
