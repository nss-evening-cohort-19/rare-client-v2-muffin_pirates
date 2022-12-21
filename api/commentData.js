import { clientCredentials } from '../utils/client';

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${commentId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        author: data.user,
        post: data.post_id,
        content: data.content,
        createdOn: data.created_on,
      });
    })
    .catch((error) => reject(error));
});

const getCommentsByPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/post-comments/${postId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createComment = (comment) => new Promise((resolve, reject) => {
  const commentObj = {
    author: comment.user,
    post: comment.post_id,
    content: comment.content,
    createdOn: comment.created_on,
  };
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateComment = (comment) => new Promise((resolve, reject) => {
  const commentObj = {
    id: comment.id,
    author: comment.user,
    post: comment.post_id,
    content: comment.content,
    createdOn: comment.created_on,
  };
  fetch(`${clientCredentials.databaseURL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getComments, getSingleComment, createComment, updateComment, deleteComment, getCommentsByPost,
};
