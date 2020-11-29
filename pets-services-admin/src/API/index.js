import axios from "axios";

const BASE_URL_API = "https://pets-services.azurewebsites.net";

const loginModel = {
  password: String,
  email: String,
};

const login = async (loginModel) => {

    const rep = await axios.post(BASE_URL_API + "/users/actions/login", loginModel);
    return rep.data;
  
};

export { login, loginModel };
