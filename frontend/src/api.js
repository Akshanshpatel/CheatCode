import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:8080/auth'
})

export const googleAuth=(code)=>api.get(`/google/code=${code}`)


// more secure code 

// import axios from "axios";

// const api = axios.create({
//   baseURL: 'http://localhost:8080/auth',
//   withCredentials: true
// });

// export const googleAuth = (code) =>
//   api.post('/google', { code });
