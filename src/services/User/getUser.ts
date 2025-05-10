import api from "@/api/axios";
import { IUser } from "./IUser"; // Importe a interface IUser

interface ErrorResponse {
  error: string;
}

/**
 * Função para obter os dados do usuário logado.
 * 
 * @returns {Promise<IUser | ErrorResponse>} Dados do usuário ou erro.
 */
export const getUser = async (): Promise<IUser | ErrorResponse> => {
  try {
    const response = await api.get<IUser>("/user/authUser"); // Realiza a requisição GET para a rota do usuário logado
    return response.data; // Retorna os dados do usuário logado
  } catch (error: any) {
    return { error: error.response?.data?.message || "Erro ao obter dados do usuário." }; // Retorna um erro, caso a requisição falhe
  }
};
