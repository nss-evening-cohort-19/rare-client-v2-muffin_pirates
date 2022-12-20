/* eslint-disable import/no-absolute-path */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { loginUser } from '../../utils/data/AuthManager';
import { createPost, updatePost } from '../../api/postData';
import { getCategories } from '../../api/categoryData';

const initialState = {
  name: ' ',
  // id: ' ',
  user_id: null,
  category_id: null,
  category: ' ',
  title: ' ',
  publication_date: ' ',
  image_url: ' ',
  content: ' ',
  approved: null,
  first_name: ' ',
  reaction_id: null,
};

export default function PostForm({ obj }) {
  const [categories, setCategories] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  // const { user } = loginUser('res');
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    if (obj.id)setFormInput(obj);
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
    if (obj.id) {
      updatePost(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput };
      createPost(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Post Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image_url" value={formInput.image_url} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control type="text" placeholder="Content" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="CategoryId"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {
            categories?.map((category) => (
              <option
                defaultValue={category.id === formInput.categoryId}
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    category_id: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.number,
    // first_name: PropTypes.string,
    // reaction_id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};
