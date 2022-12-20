/* eslint-disable import/no-absolute-path */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createCategory, getCategories, updateCategory } from '../../api/categoryData';

const initialState = {
  label: '',
};

export default function CategoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setFormInput);
    if (obj)setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updateCategory(formInput, obj).then(() => router.push('/categories'));
    } else {
      createCategory(...formInput).then(() => {
        router.push('/categories');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj ? 'Update' : 'Create'} Categories</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Label"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Category Label"
          name="label"
          value={setFormInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button
        type="submit"
      >{obj ? 'Update' : 'Create'}
        Category
      </Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

CategoryForm.defaultProps = {
  obj: initialState,
};
