const getUserById = (id) => fetch(`http://localhost:8088/users/${id}`)
  .then((res) => res.json());

export default getUserById;
