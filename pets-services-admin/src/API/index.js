import axios from "axios";

const BASE_URL_API = "https://pets-services.azurewebsites.net";
//const BASE_URL_API = "http://localhost:5000";

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

export { login, searchUser, addUser, deleteUser };
