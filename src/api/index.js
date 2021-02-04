import axios from "axios";
import { Base } from "../util/base";

// const cookies = new Cookies();
const api = axios.create();

// base url
api.defaults.baseURL = Base;

export default api;
