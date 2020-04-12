import { LOGIN_USER, REGISTER_USER } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSucess: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        sucess: action.payload,
      };
    default:
      return state;
  }
}
