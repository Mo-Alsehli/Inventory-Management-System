import axios from "axios";

export default axios.create({
  baseURL:
    "https://inventory-management-system22.herokuapp.com/api/v1/products",
});
