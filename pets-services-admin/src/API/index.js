import axios from "axios";
import "./model";

const BASE_URL_API = "https://pets-services.azurewebsites.net";

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
  };
  const rep = await axios.get(BASE_URL_API + "/users/", config);
  return rep.data;
};

export { login, searchUser };
