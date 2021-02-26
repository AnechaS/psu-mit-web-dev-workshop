export const login = (authToken, user) => ({
  type: 'AUTHENTICATION_LOGIN',
  payload: { authToken, user },
});

export const logout = () => ({
  type: 'AUTHENTICATION_LOGOUT',
});
