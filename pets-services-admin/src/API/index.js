import axios from "axios";

//const BASE_URL_API = "https://pets-services.azurewebsites.net";
const BASE_URL_API = "http://localhost:8080";

const login = async (loginModel) => {
  const rep = await axios.post(
    BASE_URL_API + "/users/actions/login",
    loginModel
  );
  return rep.data;
};

const searchUser = async (searchUserModel) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
    params: searchUserModel
  };
  const rep = await axios.get(BASE_URL_API + "/users?", config);
  return rep.data;
};

const getUser = async (userId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.get(BASE_URL_API + `/users/${userId}`, config);
  return rep.data;
};

const updateUser = async (userModel) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.patch(BASE_URL_API + `/users/${userModel.userId}`, userModel, config);
  return rep.data;
};

const addUser = async (userModel) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.post(BASE_URL_API + "/users/actions/addbyadmin", userModel, config);
  return rep.data;
};

const deleteUser = async (userId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
 return await axios.delete(BASE_URL_API + `/users/${userId}`, config);
};

const searchServicesHours = async(searchServicesHoursModel) =>{
  const config = {
    headers:{
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
    params : searchServicesHoursModel
  };
  const rep = await axios.get(BASE_URL_API + '/serviceshours?', config);
  return rep.data;
};

const deleteServiceHours = async(serviceHoursId) =>{
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
 return await axios.delete(BASE_URL_API + `/servicesHours/${serviceHoursId}`, config);
};

export { login, searchUser, addUser, deleteUser, getUser, updateUser, searchServicesHours, deleteServiceHours };
