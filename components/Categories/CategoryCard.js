import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteCategory } from '../../api/categoryData';

function CategoryCard({
  id,
  label,
  onUpdate,
}) {
  const deleteSingleCategory = () => {
    if (window.confirm(`Delete ${label}?`)) {
      deleteCategory(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Category: {label}</Card.Title>
      </Card.Body>
      <Card.Footer className="text-muted">Rare</Card.Footer>
      <Link href={`/Categories/edit/${id}`} passHref>
        <Button variant="success" className="m-2">EDIT</Button>
      </Link>
      <Button variant="danger" className="m-2" onClick={deleteSingleCategory}>DELETE</Button>
    </Card>
  );
}

CategoryCard.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  onUpdate: PropTypes.func,
}.isRequired;

export default CategoryCard;
