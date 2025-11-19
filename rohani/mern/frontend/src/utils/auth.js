export const getStoredAuth = () => {
  const raw = localStorage.getItem("userInfo");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getAuthHeaders = () => {
  const auth = getStoredAuth();
  const token = auth?.token;

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

