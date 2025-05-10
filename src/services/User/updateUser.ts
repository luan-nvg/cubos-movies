// updateUser.ts

import api from "@/api/axios";  // Importando a instância do axios
import { IUser } from "./IUser";  // Importando a interface IUser

interface ErrorResponse {
  error: string;
}

/**
 * Função para atualizar os dados do usuário logado.
 * 
 * @param {IUser} user Dados atualizados do usuário
 * @returns {Promise<IUser | ErrorResponse>} Dados atualizados do usuário ou erro
 */
export const updateUser = async (user: IUser): Promise<IUser | ErrorResponse> => {
  try {
    console.log("Dados enviados para atualização:", user);
    const response = await api.patch<IUser>("/user/authUser/update", user);  // Envia uma requisição PATCH para atualizar os dados do usuário
    return response.data;  // Retorna os dados atualizados
  } catch (error: any) {
    return { error: error.response?.data?.message || "Erro ao atualizar dados do usuário." };  // Retorna erro em caso de falha
  }
};
