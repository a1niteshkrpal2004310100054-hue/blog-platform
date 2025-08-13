export interface DecoaderUser {
  userId: string;
  iat: number;
  exp: number;
  [key: string]: unknown;
}

export const getCurrentUser = (): DecoaderUser | undefined => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "+");
    const decoded = JSON.parse(atob(base64));
    return decoded as DecoaderUser;
  } catch (error) {
    console.error(error);
  }
};
