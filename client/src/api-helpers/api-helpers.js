import axios from 'axios';
import BaseURL from '../config'



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

/** Get user Profile */
export const UserProfiles = async()=>{
  const id= localStorage.getItem("userId");
  const res = await axios.get(`${BaseURL}user/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;
  return resData
}
export const updateUserProfile= async(data)=>{
  
try {
  const id= localStorage.getItem("userId");
  const res = await axios.put(`${BaseURL}user/${id}`,{
    name:data.name,
    email: data.email,
   
    phone: data.phone
    
  });
  const resData = res.data;
    return resData;
  
} catch (error) {
  console.log(error);
    throw error
  
}
}