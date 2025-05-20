import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = async (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const Fetch = async() => {
        try {
          const url = import.meta.env.VITE_company_endpoint;
          const response = await axios.get(`${url}/get/${id}`, {
            withCredentials: true,
          });
          console.log(response);
          if (response?.data?.success) {
            dispatch(setSingleCompany(response?.data?.company));
          }
        } catch (error) {
          console.log(error);
        }
      };
      Fetch();
  },[id,dispatch]);
 
};

export default useGetCompanyById;
