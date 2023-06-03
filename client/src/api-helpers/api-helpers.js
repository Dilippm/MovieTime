import axios from 'axios';
require('dotenv').config();
const  BaseURL=process.env.BASE_URL;


export const getAllMovies = async () => {
  try {
    const res = await axios.get(`${BaseURL}movie/movies`);
    if (res.status !== 200) {
      console.log('No Data');
      return null;
    }
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/** user Login */
export const sendUserAuthRequest = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}user/login`, {
      email: data.email,
      password: data.password
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
};
/**User Register */
export const sendUserRegister = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}user/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
}

/** Admin Login  */
export const adminLogin = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}admin/login`, {
      email: data.email,
      password: data.password,
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
    
  }
};


/** Owner Login */
export const ownerLogin = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}owner/login`, {
     
      email: data.email,
      password: data.password,
      
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
   
  }
}


/**Owner Register */
export const OwnerSignup = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}owner/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
}

