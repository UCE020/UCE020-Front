import { api } from './api';
import { UserProfile, UserProfileResponse, UpdateProfilePayload } from '../types/userProfile';

// Formato bruto retornado pelo backend (em português)
type BackendUserProfile = {
  id: number;
  name: string;
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
    name: raw.name,
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
    const { data } = await api.patch<BackendUserProfileResponse>('/user/me', payload);
    return {
      data: toUserProfile(data.data),
      statusCode: data.statusCode,
    };
  }
}

export const userProfileService = new UserProfileService();