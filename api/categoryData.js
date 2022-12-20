import { clientCredentials } from '../utils/client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${categoryId}`)
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

const createCategory = (category, user) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
    user_id: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    body: JSON.stringify(categoryObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateCategory = (category, user) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
    user_id: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/categories/${category.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory,
};
