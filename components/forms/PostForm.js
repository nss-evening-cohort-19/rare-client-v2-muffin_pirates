/* eslint-disable import/no-absolute-path */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { loginUser } from '../../utils/data/AuthManager';
import { createPost, updatePost } from '../../api/postData';

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
  const [formInput, setFormInput] = useState(initialState);
  // const { user } = loginUser('res');
  const router = useRouter();

  useEffect(() => {
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
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          aria-label="Category"
          name="category"
          type="text"
          value={formInput.category}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Category</option>
          <option value="News">News</option>
          <option value="Business">Business</option>
          <option value="Hobbies">Hobbies</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </Form.Select>
      </FloatingLabel>
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
