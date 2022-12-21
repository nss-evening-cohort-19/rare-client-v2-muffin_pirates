import { clientCredentials } from '../utils/client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createCategory = (category) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
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

const updateCategory = (category) => new Promise((resolve, reject) => {
  const categoryObj = {
    label: category.label,
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
