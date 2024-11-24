import { combineReducers } from "redux";

import profile from "./slices/profileSlice";
import categories from "./slices/categoriesSlice";
import wallet from "./slices/walletSlice";

export default combineReducers({
  profile,
  categories,
  wallet,
});
