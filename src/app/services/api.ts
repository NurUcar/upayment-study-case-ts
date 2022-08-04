import axios from "axios";
import config from "../config";

const createProduct = async (avatar: string, category: string, description: string, developerEmail: string, name: string, price:number) => {
  
    const url = `https://upayments-studycase-api.herokuapp.com/api/products`;
    const res = await axios.post(url, { avatar, category, description, developerEmail, name, price },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + config.accessToken
            }
        });

    return res.data;
};


const getProducts = async () => {
    const url = `https://upayments-studycase-api.herokuapp.com/api/products`;
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + config.accessToken
            }
        });

    return res.data;
};


const getProduct = async (id: string) => {

    const url = `https://upayments-studycase-api.herokuapp.com/api/products/${id}`;
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + config.accessToken
            }
        });

    return res.data;
};

const getCategories = async () => {
    const url = `https://upayments-studycase-api.herokuapp.com/api/categories/`;
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + config.accessToken
            }
        });

    return res.data;
};

const getCategory = async (id: string) => {

    const url = `https://upayments-studycase-api.herokuapp.com/api/categories/${id}`;
    const res = await axios.get(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + config.accessToken
            }
        });

    return res.data;
};


const api = {
   createProduct,
   getProducts,
   getProduct,
   getCategories,
   getCategory
}


export default api;
