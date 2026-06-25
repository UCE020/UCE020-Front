export type UserProfile = {
  id: number;
  name: string;
  email: string;
  password?: string; 
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfilePayload = Partial<{
  name: string;
  email: string;
}>;

export type UserProfileResponse = {
  data: UserProfile;
  statusCode: number;
};