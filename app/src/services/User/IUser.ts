// src/services/User/IUser.ts

export interface IUser {
  _id: string; // ID do usuário
  username: string; // Nome de usuário
  email: string; // Email do usuário
  phone?: string; // Adicionando o campo phone
  name?: string; // Nome completo do usuário (se houver)
  profileUrl?: string; // URL do perfil do usuário (se houver)
  // Adicione outros campos conforme necessário
}
