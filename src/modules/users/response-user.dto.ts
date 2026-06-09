interface UserResponse {
  id: number;
  role: string;
  name: string;
  email: string;
  created_at: string;
}

export const toUserResponse = (user: any): UserResponse => ({
  id: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  created_at: user.created_at,
});
