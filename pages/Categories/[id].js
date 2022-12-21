import { useEffect, useState } from 'react';
import CategoryCard from '../../components/Categories/CategoryCard';
import { getCategories } from '../../api/categoryData';

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <article className="categories">
      <h1>Categories</h1>
      {categories.map((category) => (
        <section key={`category--${category.id}`} className="category">
          <CategoryCard label={category.label} onUpdate={getCategories} />
        </section>
      ))}
    </article>
  );
}

export default CategoryPage;
