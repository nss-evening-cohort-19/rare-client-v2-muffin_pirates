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
  id: null,
  category: ({
    id: 1,
    label: '',
  }),
  title: ' ',
  imageUrl: ' ',
  content: ' ',
};

const PostForm = ({ obj, user, categoryId }) => {
  const [categories, setCategories] = useState([]);

  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
    if (obj.id) {
      setFormInput(obj);
    }
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
      updatePost(formInput, obj.id, user.uid, categoryId).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, user: user.uid };
      createPost(payload).then(() => router.push('/'));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Post Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Content" className="mb-3">
        <Form.Control type="text" placeholder="Content" name="content" value={formInput.content} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect">
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="categoryId" defaultValue={categoryId} onChange={handleChange} label="Select Category">
            {formInput.id ? <option value="">{formInput.category?.label}</option> : <option value="">Select Category</option>}
            {categories.map((category) => (
              <option key={category.id} value={category.id} defaultValue={category.id === formInput.categoryId}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
};

PostForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }),
  categoryId: PropTypes.number,
};

PostForm.defaultProps = {
  obj: initialState,
  categoryId: 1,
};

export default PostForm;
