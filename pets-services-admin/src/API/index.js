import axios from "axios";

//const BASE_URL_API = "https://pets-services.azurewebsites.net";
const BASE_URL_API = "http://localhost:8080";

const login = async (loginModel) => {
  const rep = await axios.post(
    BASE_URL_API + "/v1/users/actions/login",
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
  const rep = await axios.get(BASE_URL_API + "/v1/users?", config);
  return rep.data;
};

const getUser = async (userId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.get(BASE_URL_API + `/v1/users/${userId}`, config);
  return rep.data;
};

const updateUser = async (userModel) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.patch(BASE_URL_API + `/v1/users/${userModel.userId}`, userModel, config);
  return rep.data;
};

const addUser = async (userModel) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
  const rep = await axios.post(BASE_URL_API + "/v1/users/actions/addbyadmin", userModel, config);
  return rep.data;
};

const deleteUser = async (userId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
 return await axios.delete(BASE_URL_API + `/v1/users/${userId}`, config);
};

const searchServicesHours = async(searchServicesHoursModel) =>{
  const config = {
    headers:{
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
    params : searchServicesHoursModel
  };
  const rep = await axios.get(BASE_URL_API + '/v1/serviceshours?', config);
  return rep.data;
};

const deleteServiceHours = async(serviceHoursId) =>{
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
 return await axios.delete(BASE_URL_API + `/v1/servicesHours/${serviceHoursId}`, config);
};

const searchRankings = async(searchRankingsModel) =>{
  const config = {
    headers:{
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
    params : searchRankingsModel
  };
  const rep = await axios.get(BASE_URL_API + '/v1/rankings?', config);
  return rep.data;
};

const deleteRanking = async(rankingId) =>{
  const config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    }
  };
 return await axios.delete(BASE_URL_API + `/v1/rankings/${rankingId}`, config);
};



export { login, searchUser, addUser, deleteUser, getUser, updateUser, searchServicesHours, deleteServiceHours, searchRankings, deleteRanking };
