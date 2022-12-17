import { clientCredentials } from '../utils/client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        user: data.user,
        category: data.category_id,
        title: data.title,
        publicationDate: data.publication_date,
        imagerl: data.image_url,
        content: data.content,
      });
    })
    .catch((error) => reject(error));
});

const createPost = (post) => new Promise((resolve, reject) => {
  const postObj = {
    user: post.user,
    category: Number(post.category_id),
    title: post.title,
    publicationDate: post.publication_date,
    imagerl: post.image_url,
    content: post.content,
  };
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePost = (post) => new Promise((resolve, reject) => {
  const postObj = {
    id: post.id,
    user: post.user,
    category: Number(post.category_id),
    title: post.title,
    publicationDate: post.publication_date,
    imagerl: post.image_url,
    content: post.content,
  };
  fetch(`${clientCredentials.databaseURL}/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPosts, getSinglePost, createPost, updatePost, deletePost,
};
