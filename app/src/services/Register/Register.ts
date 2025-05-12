import api from "@/api/axios";
import { IRegisterData } from "@/pages/Register/interface";

import axios from "axios";

const onRegisterSubmit = async (data: IRegisterData) => {
  const url = "auth/register";

  try {
    const response = await api.post(url, data);
    console.log("Register successful:", response.data);
    window.location.href = "/login";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default onRegisterSubmit;
