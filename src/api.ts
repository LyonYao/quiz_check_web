import { useContext } from 'react';
const API_URL = process.env.REACT_APP_API_URL;


const apiFetch = (endpoint: string, options: RequestInit = {}) => {
 
  return fetch(`${API_URL}${endpoint}`, options)
    .then((response) => {
      if (response.status.toString().startsWith('5')) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
};

export default apiFetch;