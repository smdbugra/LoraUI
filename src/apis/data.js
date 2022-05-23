import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:3001/loraData/',
});
// export default axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com/users',
// });
