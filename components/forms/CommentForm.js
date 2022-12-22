/* eslint-disable import/no-absolute-path */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { loginUser } from '../../utils/data/AuthManager';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  post_id: null,
  author_id: null,
  content: ' ',
};

export default function CommentForm({ obj }) {
  const [commentFormInput, setCommentFormInput] = useState(initialState);
  // const { user } = loginUser('res');
  const router = useRouter();

  useEffect(() => {
    if (obj.id)setCommentFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCommentFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateComment(commentFormInput).then(() => router.push('/'));
    } else {
      const payload = { ...commentFormInput };
      createComment(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comments</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Content"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Comment"
          name="content"
          value={setCommentFormInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button
        type="submit"
      >{obj.id ? 'Update' : 'Create'}
        Comment
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
};
