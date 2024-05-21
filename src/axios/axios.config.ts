import axios from 'axios'

  const axiosConfig = axios.create({
    baseURL: 'https://hal-test.hal-logistics.la/api/', 
    timeout: 5000, // Set a timeout for requests
    headers: {
      'Content-Type': 'application/json'
    },
  });

  axios.interceptors.response.use((response) => Promise.resolve(response), (error) => {
    if (error.response.status === 403) {
      // store.dispatch("auth/logout", { call: false });
    }

    const errorMessage = error.response.data?.message;
    error.response.data.message = errorMessage.length > 200 ? JSON.parse(errorMessage.split("code :").pop()).error.message.split(":", )[0] : errorMessage;

    return Promise.reject(error);
  })

export { 
  axiosConfig,
  axios
}