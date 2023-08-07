import { userActions } from "../reducers/userReducers";

export const logOut = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
