export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") !== null;
};
