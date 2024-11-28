import axios from 'axios';

const API_BASE_URL = 'http://basokrijo.infinityfreeapp.com/connection.php';

export const fetchMenu = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;  // Return only the data from the response
  } catch (error) {
    console.error('Error fetching data list: ', error);
    throw error;  // Re-throw error for error handling in the component
  }
};
