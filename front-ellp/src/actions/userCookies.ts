export const setUserId = (userId: string) => {
  if (!localStorage) return;
  localStorage.setItem("USER_ID", userId);
};

export const getUserId = () => {
  if (!localStorage) return;
  return localStorage?.getItem("USER_ID");
};
