export const setUserId = (userId: string) => {
  localStorage.setItem("USER_ID", userId);
};

export const getUserId = () => {
  return localStorage.getItem("USER_ID");
};
