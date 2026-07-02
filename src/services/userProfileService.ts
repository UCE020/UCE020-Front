import { api } from './api';
import { UserProfile, UserProfileResponse, UpdateProfilePayload } from '../types/userProfile';

// Formato bruto retornado pelo backend (em português)
type BackendUserProfile = {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type BackendUserProfileResponse = {
  data: BackendUserProfile;
  statusCode: number;
};

function toUserProfile(raw: BackendUserProfile): UserProfile {
  return {
    id: raw.id,
    name: raw.nome,
    email: raw.email,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

class UserProfileService {
  /**
   * Retorna o perfil do usuário autenticado
   */
  async getProfile(): Promise<UserProfileResponse> {
    const { data } = await api.get<BackendUserProfileResponse>('/user/me');
    return {
      data: toUserProfile(data.data),
      statusCode: data.statusCode,
    };
  }

  /**
   * Atualiza nome e/ou email do usuário autenticado
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfileResponse> {
    const backendPayload = {
      ...(payload.name !== undefined && { nome: payload.name }),
      ...(payload.email !== undefined && { email: payload.email }),
    };

    const { data } = await api.patch<BackendUserProfileResponse>('/user/me', backendPayload);
    return {
      data: toUserProfile(data.data),
      statusCode: data.statusCode,
    };
  }

  async uploadAvatar(file: File): Promise<{ data: { avatarUrl: string }; statusCode: number }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await api.post<{ data: { avatarUrl: string }; statusCode: number }>(
      '/user/me/avatar',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return data;
  }

  async changePassword(payload: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.patch('/user/me/password', {
      senhaAtual: payload.currentPassword,
      novaSenha: payload.newPassword,
    });
  }
}

export const userProfileService = new UserProfileService();