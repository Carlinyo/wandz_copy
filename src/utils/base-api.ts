import axios from 'axios';

const baseUrl = 'https://wandz-server.dev.wandzops.com'; // FOR LOCAL 'http://localhost:3001'

const baseApi = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json', // Adjust the content type based on your API requirements
    Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Include authorization header if required
    // Add any other headers as needed for your specific API
  },
});

export default baseApi;
